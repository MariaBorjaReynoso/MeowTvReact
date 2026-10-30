/*
  Name: Maria Reynoso
  Date: 10.30.2026
  CSC 372-01
  
  File: ShowDetail.jsx
  Description: The detail page for a single show. It reads the show ID from the URL using 
  useParams, fetches the full show data and the full cast list (up to 15), and provides 
  a Link back to the main gallery.
*/

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function ShowDetail() {
  // useParams grabs the :id from the URL (e.g., /shows/123 -> id is "123")
  const { id } = useParams(); 
  
  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);

  // Fetch the full show data and cast whenever the ID in the URL changes
  useEffect(() => {
    async function fetchShow() {
      try {
        const res = await fetch("https://api.tvmaze.com/shows/" + id);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        setShow(data);

        const castRes = await fetch("https://api.tvmaze.com/shows/" + id + "/cast");
        if (!castRes.ok) throw new Error("HTTP " + castRes.status);
        const castData = await castRes.json();
        
        // Save up to 15 cast members
        setCast(castData.slice(0, 15)); 
      } catch (err) {
        console.error("Failed to load show details", err);
      }
    }
    fetchShow();
  }, [id]);

  // If 'show' is still null, we are still waiting for the fetch to finish
  if (!show) return <p>Loading...</p>;

  return (
    <div>
      {/* Link takes you back to the main page without reloading */}
      <Link to="/">Back to Gallery</Link>
      <h2>{show.name}</h2>
      <p dangerouslySetInnerHTML={{ __html: show.summary || "Not available" }}></p>
      
      <h3>Status: {show.status || "Not available"}</h3>
      <h3>Network: {show.network ? show.network.name : "Not available"}</h3>

      <h3>Cast</h3>
      <ul>
        {/* Loop through the cast array and display the actor and character name */}
        {cast.map((entry) => (
          <li key={entry.person.id}>
            {entry.person.name} as {entry.character ? entry.character.name : "Unknown"}
          </li>
        ))}
      </ul>
    </div>
  );
}