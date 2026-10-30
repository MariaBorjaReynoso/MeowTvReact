/*
  Name: Maria Reynoso
  Date: 10.30.2026
  CSC 372-01
   
  File: App.jsx
  The main parent component. It holds the search state (query, results, status)
  and sets up the React Router routes. It passes state down to child components as props.
*/

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SearchForm from "./components/SearchForm.jsx";
import ShowList from "./components/ShowList.jsx";
import ShowDetail from "./components/ShowDetail.jsx";

export default function App() {
  // State: The current search term (starts as "friends")
  const [query, setQuery] = useState("friends");
  // State: The list of shows returned by the API
  const [results, setResults] = useState([]);
  // State: Tracks if we are loading, have an error, or have results
  const [status, setStatus] = useState("idle");

  // useEffect runs whenever the 'query' changes
  useEffect(() => {
    async function fetchShows() {
      if (!query.trim()) {
        setResults([]);
        setStatus("empty");
        return;
      }

      setStatus("loading");
      try {
        // Fetch data from the TVmaze API
        const res = await fetch("https://api.tvmaze.com/search/shows?q=" + encodeURIComponent(query));
        if (!res.ok) throw new Error("HTTP " + res.status);
        
        const data = await res.json();
        // Keep only the top 10 results
        setResults(data.slice(0, 10)); 
        setStatus(data.length ? "success" : "empty");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }
    fetchShows();
  }, [query]); // The empty bracket [query] means "run this when query changes"

  return (
    <div>
      <header>
        <h1>MeowTV Show Gallery</h1>
        {/* Show the search form ONLY on the main gallery page */}
        <Routes>
          <Route path="/" element={<SearchForm query={query} onSearch={setQuery} />} />
        </Routes>
      </header>

      <main>
        <Routes>
          {/* Route 1: The Home Gallery Page */}
          <Route 
            path="/" 
            element={
              <>
                {status === "loading" && <p>Loading...</p>}
                {status === "error" && <p>Failed to load shows. Please try again.</p>}
                {status === "empty" && <p>No shows found for "{query}".</p>}
                
                {status === "success" && (
                  <p>Showing {results.length} result(s) for "{query}".</p>
                )}
                
                <ShowList results={results} />
              </>
            } 
          />
          {/* Route 2: The Detail Page (when you click a show) */}
          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </main>

      <footer>
        <p>Data from <a href="https://www.tvmaze.com/api" target="_blank" rel="noopener noreferrer">TVmaze</a> (CC BY-SA).</p>
      </footer>
    </div>
  );
}