/*
  Name: Maria Reynoso
  Date: 10.30.2026
  CSC 372-01
  
 A controlled form component. It keeps track of what the user is typing
  and sends that value up to the App component when the form is submitted.
*/

import { useState, useEffect } from "react";

// We receive 'query' and 'onSearch' from the App component as props.
export default function SearchForm({ query, onSearch }) {
  // Local state to track what is currently typed in the input box
  const [inputValue, setInputValue] = useState(query);

  // If the parent 'query' changes (like on first load), update the input box
  useEffect(() => {
    setInputValue(query);
  }, [query]);

  // When the user clicks "Search" or presses Enter
  function handleSubmit(event) {
    event.preventDefault(); // Stop the page from refreshing!
    onSearch(inputValue);   // Send the typed value back up to App
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">Search:</label>
      <input 
        id="search"
        type="text" 
        value={inputValue} // Tells the input what to display
        onChange={(e) => setInputValue(e.target.value)} // Updates state as you type
      />
      <button type="submit">Search</button>
    </form>
  );
}