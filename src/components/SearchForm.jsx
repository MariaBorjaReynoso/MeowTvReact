/*
  Name: Maria Reynoso
  Date: 10.30.2026
  CSC 372-01
*/

import { useState, useEffect } from "react";

export default function SearchForm({ query, onSearch }) {
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(inputValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">Search:</label>
      <input 
        id="search"
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <button type="submit">Search</button>
    </form>
  );
}