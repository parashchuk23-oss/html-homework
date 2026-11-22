import MovieCard from "./MovieCard.jsx";

// Перетворюємо кожен елемент масиву movies на компонент MovieCard.
export default function MovieList({ movies, onToggleWatched }) {
  if (movies.length === 0) {
    return <p className="empty-state">Список порожній. Додай перший фільм!</p>;
  }
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onToggleWatched={onToggleWatched} />
      ))}
    </div>
  );
}
