/*
  Name: Maria Reynoso
  Date: 10.30.2026
  CSC 372-01
*/

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchShow() {
      try {
        const res = await fetch("https://api.tvmaze.com/shows/" + id);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        setShow(data);

        const castRes = await fetch("https://api.tvmaze.com/shows/" + id + "/cast");
        if (!res.ok) throw new Error("HTTP " + res.status);
        const castData = await castRes.json();
        setCast(castData.slice(0, 15)); // Up to 15 cast members
      } catch (err) {
        console.error("Failed to load show details", err);
      }
    }
    fetchShow();
  }, [id]);

  if (!show) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/">Back to Gallery</Link>
      <h2>{show.name}</h2>
      <p dangerouslySetInnerHTML={{ __html: show.summary || "Not available" }}></p>
      
      <h3>Status: {show.status || "Not available"}</h3>
      <h3>Network: {show.network ? show.network.name : "Not available"}</h3>

      <h3>Cast</h3>
      <ul>
        {cast.map((entry) => (
          <li key={entry.person.id}>
            {entry.person.name} as {entry.character ? entry.character.name : "Unknown"}
          </li>
        ))}
      </ul>
    </div>
  );
}