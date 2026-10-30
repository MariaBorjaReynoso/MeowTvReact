/*
  Name: Maria Reynoso
  Date: 10.30.2026
  CSC 372-01
*/

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ShowCard({ show }) {
  const [cast, setCast] = useState([]);

  // Fetch the cast for this specific show
  useEffect(() => {
    async function fetchCast() {
      try {
        const res = await fetch("https://api.tvmaze.com/shows/" + show.id + "/cast");
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        // Get up to 4 names
        setCast(data.slice(0, 4).map((entry) => entry.person.name));
      } catch (err) {
        console.error("Failed to load cast", err);
      }
    }
    fetchCast();
  }, [show.id]);

  return (
    <div className="show-card">
      {show.image && <img src={show.image.medium} alt={"Poster for " + show.name} />}
      
      <h2>
        <Link to={"/shows/" + show.id}>{show.name}</Link>
      </h2>
      
      {/* Remove HTML tags from summary */}
      <p dangerouslySetInnerHTML={{ __html: show.summary || "Not available" }}></p>
      
      <p>Premiered: {show.premiered || "Not available"}</p>
      <p>Genres: {show.genres && show.genres.length ? show.genres.join(", ") : "Not available"}</p>
      <p>Rating: {show.rating && show.rating.average ? show.rating.average : "Not available"}</p>
      
      <p>Cast: {cast.length ? cast.join(", ") : "Not available"}</p>
      
      <a href={show.url} target="_blank" rel="noopener noreferrer">Check on TVmaze</a>
    </div>
  );
}