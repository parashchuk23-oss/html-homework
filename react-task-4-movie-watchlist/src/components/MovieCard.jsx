// Інформація про фільм і функція зміни статусу передаються через props.
export default function MovieCard({ movie, onToggleWatched }) {
  return (
    <article className={"movie-card" + (movie.watched ? " watched" : "")}>
      <div className="movie-symbol" aria-hidden="true">▶</div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="genre">{movie.genre}</p>
        <span className={"movie-status " + (movie.watched ? "is-done" : "is-planned")}>
          {movie.watched ? "✓ Переглянуто" : "◷ Не переглянуто"}
        </span>
      </div>
      <button className="watch-button" type="button" onClick={() => onToggleWatched(movie.id)}>
        {movie.watched ? "Скасувати перегляд" : "Переглянуто"}
      </button>
    </article>
  );
}
