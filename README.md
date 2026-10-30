# MeowTV Show Gallery (React)

A React single page app that lets you search for TV shows and view show details. 

## How to Run
Run these commands in the terminal:
`npm install`
`npm run dev`
Then open `http://localhost:5173`.

## Required React Concepts

| # | Concept | File(s) Where It Appears |
|---|---|---|
| 1 | Components and props | `src/App.jsx`, `src/components/SearchForm.jsx`, `ShowList.jsx`, `ShowCard.jsx`, `ShowDetail.jsx` |
| 2 | Lists and keys | `ShowList.jsx` (`key={result.show.id}`), `ShowDetail.jsx` (`key={entry.person.id}`) |
| 3 | Conditional rendering | `App.jsx` (loading/error/empty states), `ShowDetail.jsx` (if `!show` return loading) |
| 4 | Controlled form | `SearchForm.jsx` (`value={inputValue}`, `onChange`, `onSubmit` with `preventDefault`) |
| 5 | State | `App.jsx` (`query`, `results`, `status`), `ShowCard.jsx` (cast), `ShowDetail.jsx` (show, cast) |
| 6 | Effects and fetch | `App.jsx` (search), `ShowCard.jsx` (per-card cast fetch), `ShowDetail.jsx` (single show) |
| 7 | Lifted state | `App.jsx` owns `query` and `results`; `SearchForm` updates it via the `onSearch` prop |
| 8 | Routing | `main.jsx` (`BrowserRouter`), `App.jsx` (`Routes`), `ShowCard.jsx` (`Link`), `ShowDetail.jsx` (`useParams`) |

## Reflection

Rebuilding this in React was both easier and harder than the vanilla JavaScript version. It was easier because React handles a lot of the manual DOM work for me I no longer needed `createElement()` or `appendChild()`. The gallery updates automatically whenever state changes.

It was harder because I had to think about where state should live. In the vanilla version, everything lived in `script.js` and there was no concept of "ownership." In React, I had to decide that `App` owns the search query and results, and pass them down to child components. Learning that the search form shouldn't own its own query it should receive it from a parent took a mental shift. The cast fetch was also tricky, because each card needs its own `useEffect`. But once that clicked, the structure felt cleaner. I could see exactly which component was responsible for what.