/*
  Name: Maria Reynoso
  Date: 10.30.2026
  CSC 372-01
  
  File: ShowCard.jsx
  Description: Displays a single show card. It fetches the cast list specifically for 
  this show using useEffect. It also has a Link to go to the ShowDetail page.
*/

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// We receive a single 'show' object from the ShowList component
export default function ShowCard({ show }) {
  // Local state to hold just the cast names for this specific show
  const [cast, setCast] = useState([]);

  // Fetch the cast when the card loads
  useEffect(() => {
    async function fetchCast() {
      try {
        const res = await fetch("https://api.tvmaze.com/shows/" + show.id + "/cast");
        if (!res.ok) throw new Error("HTTP " + res.status);
        
        const data = await res.json();
        // Get the first 4 actors and grab just their names
        setCast(data.slice(0, 4).map((entry) => entry.person.name));
      } catch (err) {
        console.error("Failed to load cast", err);
      }
    }
    fetchCast();
  }, [show.id]); // Runs again if the show ID changes

  return (
    <div className="show-card">
      {/* Only show the image if the API gave us one */}
      {show.image && <img src={show.image.medium} alt={"Poster for " + show.name} />}
      
      <h2>
        {/* Link changes the URL to /shows/123 without refreshing the page */}
        <Link to={"/shows/" + show.id}>{show.name}</Link>
      </h2>
      
      {/* dangerouslySetInnerHTML is the easiest way to strip HTML tags from the summary */}
      <p dangerouslySetInnerHTML={{ __html: show.summary || "Not available" }}></p>
      
      <p>Premiered: {show.premiered || "Not available"}</p>
      <p>Genres: {show.genres && show.genres.length ? show.genres.join(", ") : "Not available"}</p>
      <p>Rating: {show.rating && show.rating.average ? show.rating.average : "Not available"}</p>
      
      {/* Show the cast, or say "Not available" if the list is empty */}
      <p>Cast: {cast.length ? cast.join(", ") : "Not available"}</p>
      
      <a href={show.url} target="_blank" rel="noopener noreferrer">Check on TVmaze</a>
    </div>
  );
}