/*
  Name: Maria Reynoso
  Date: 10.30.2026
  CSC 372-01
  
  A simple component that receives an array of show results. It loops through
  the array (using map) and creates a ShowCard for each show, using the show ID as a key.
*/

import ShowCard from "./ShowCard.jsx";

export default function ShowList({ results }) {
  return (
    <section className="show-list">
      {/* .map() loops through the results array. 
          We use result.show.id as the "key" so React can track each card. */}
      {results.map((result) => (
        <ShowCard key={result.show.id} show={result.show} />
      ))}
    </section>
  );
}