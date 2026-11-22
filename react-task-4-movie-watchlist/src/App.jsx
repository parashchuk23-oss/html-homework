import { useEffect, useState } from "react";
import MovieList from "./components/MovieList.jsx";

const STORAGE_KEY = "movie-watchlist-movies-v1";
const DEMO_MOVIES = [
  { id: "demo-1", title: "Інтерстеллар", genre: "Фантастика", watched: true },
  { id: "demo-2", title: "1+1", genre: "Драма", watched: false },
  { id: "demo-3", title: "Початок", genre: "Трилер", watched: false },
  { id: "demo-4", title: "Готель «Гранд Будапешт»", genre: "Комедія", watched: true },
];

// Перевіряємо форму даних із браузера.
function isMovie(movie) {
  return movie !== null && typeof movie === "object" &&
    typeof movie.id === "string" && movie.id.length > 0 &&
    typeof movie.title === "string" && movie.title.trim().length > 0 &&
    typeof movie.genre === "string" && movie.genre.trim().length > 0 &&
    typeof movie.watched === "boolean";
}

function loadMovies() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return DEMO_MOVIES;
    const data = JSON.parse(saved);
    return Array.isArray(data) && data.every(isMovie) ? data : DEMO_MOVIES;
  } catch (error) {
    console.warn("Помилка читання LocalStorage", error);
    return DEMO_MOVIES;
  }
}

export default function App() {
  const [movies, setMovies] = useState(loadMovies);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");
  const [storageWarning, setStorageWarning] = useState("");

  // useEffect зберігає список при кожній його зміні, включно зі зміною статусу.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
      setStorageWarning("");
    } catch (storageError) {
      console.warn("Помилка запису LocalStorage", storageError);
      setStorageWarning("Не вдалося зберегти дані у браузері. Після оновлення сторінки зміни можуть зникнути.");
    }
  }, [movies]);

  function addMovie(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    const cleanGenre = genre.trim();
    if (!cleanTitle || !cleanGenre) {
      setError("Заповни назву фільму та жанр.");
      return;
    }
    const movie = {
      id: crypto.randomUUID(),
      title: cleanTitle,
      genre: cleanGenre,
      watched: false
    };
    setMovies((previous) => [...previous, movie]);
    setTitle("");
    setGenre("");
    setError("");
  }

  function toggleWatched(id) {
    setMovies((previous) => previous.map((movie) =>
      movie.id === id ? { ...movie, watched: !movie.watched } : movie
    ));
  }

  const watchedCount = movies.filter((movie) => movie.watched).length;
  const unwatchedCount = movies.length - watchedCount;

  return (
    <div className="app">
      <header className="header">
        <div className="container header-content">
          <a href="./" className="logo">Movie<span>Watchlist</span><b>.</b></a>
          <span className="header-caption">REACT • VITE • USESTATE</span>
        </div>
      </header>

      <main className="container">
        <div className="intro">
          <span className="eyebrow">МОЯ КОЛЕКЦІЯ</span>
          <h1>Фільми, які варто <span>побачити.</span></h1>
          <p>Створи свій список перегляду та позначай фільми, які вже подивився.</p>
        </div>

        <section className="stats" aria-label="Статистика фільмів">
          <div className="stat"><span>УСЬОГО ФІЛЬМІВ</span><strong>{movies.length}</strong></div>
          <div className="stat"><span>ПЕРЕГЛЯНУТО</span><strong>{watchedCount}</strong></div>
          <div className="stat"><span>ЩЕ НЕ ПЕРЕГЛЯНУТО</span><strong>{unwatchedCount}</strong></div>
        </section>

        <section className="add-panel" aria-labelledby="add-heading">
          <span className="eyebrow">НОВИЙ ЗАПИС</span>
          <h2 id="add-heading">Додати фільм</h2>
          <form onSubmit={addMovie} className="add-form" noValidate>
            <div className="form-field">
              <label htmlFor="movie-title">Назва фільму</label>
              <input id="movie-title" value={title} onChange={(e) => { setTitle(e.target.value); setError(""); }} maxLength={120} placeholder="Наприклад, Матриця" required />
            </div>
            <div className="form-field">
              <label htmlFor="movie-genre">Жанр</label>
              <input id="movie-genre" value={genre} onChange={(e) => { setGenre(e.target.value); setError(""); }} maxLength={60} placeholder="Наприклад, Фантастика" required />
            </div>
            <button type="submit" className="add-button">+ Додати фільм</button>
          </form>
          {error && <p className="error" role="alert">{error}</p>}
          {storageWarning && <p className="error" role="status">{storageWarning}</p>}
        </section>

        <section aria-labelledby="movies-heading">
          <div className="section-title">
            <div><span className="eyebrow">СПИСОК ФІЛЬМІВ</span><h2 id="movies-heading">Моя колекція</h2></div>
            <span className="count">{movies.length} фільмів</span>
          </div>
          <MovieList movies={movies} onToggleWatched={toggleWatched} />
        </section>
        <footer>Навчальний React-проєкт. Фільми зберігаються в LocalStorage цього браузера.</footer>
      </main>
    </div>
  );
}
