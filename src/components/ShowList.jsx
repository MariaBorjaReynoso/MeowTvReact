/*
  Name: Maria Reynoso
  Date: 10.30.2026
  CSC 372-01
*/

import ShowCard from "./ShowCard.jsx";

export default function ShowList({ results }) {
  return (
    <section className="show-list">
      {results.map((result) => (
        <ShowCard key={result.show.id} show={result.show} />
      ))}
    </section>
  );
}