/*
  Name: Maria Reynoso
  Date: 10.30.2026
  CSC 372-01
*/

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SearchForm from "./components/SearchForm.jsx";
import ShowList from "./components/ShowList.jsx";
import ShowDetail from "./components/ShowDetail.jsx";

export default function App() {
  const [query, setQuery] = useState("friends");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error | empty | success

  // Fetch shows whenever the query changes
  useEffect(() => {
    async function fetchShows() {
      if (!query.trim()) {
        setResults([]);
        setStatus("empty");
        return;
      }

      setStatus("loading");
      try {
        const res = await fetch("https://api.tvmaze.com/search/shows?q=" + encodeURIComponent(query));
        if (!res.ok) throw new Error("HTTP " + res.status);
        
        const data = await res.json();
        setResults(data.slice(0, 10)); // Max 10 shows
        setStatus(data.length ? "success" : "empty");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }
    fetchShows();
  }, [query]);

  return (
    <div>
      <header>
        <h1>MeowTV Show Gallery</h1>
        <Routes>
          <Route path="/" element={<SearchForm query={query} onSearch={setQuery} />} />
        </Routes>
      </header>

      <main>
        <Routes>
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
          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </main>

      <footer>
        <p>Data from <a href="https://www.tvmaze.com/api" target="_blank" rel="noopener noreferrer">TVmaze</a> (CC BY-SA).</p>
      </footer>
    </div>
  );
}