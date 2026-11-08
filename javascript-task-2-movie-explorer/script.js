"use strict";

// Movie Explorer — навчальний проєкт на чистому JavaScript.
// Початковий масив із 8 об'єктів попереднього завдання.
const movies = [
  { id: 1, title: "Інтерстеллар", year: 2014, genre: "Фантастика", rating: 8.7, watched: true },
  { id: 2, title: "Початок", year: 2010, genre: "Трилер", rating: 8.8, watched: true },
  { id: 3, title: "Зелена книга", year: 2018, genre: "Драма", rating: 8.2, watched: false },
  { id: 4, title: "Коко", year: 2017, genre: "Анімація", rating: 8.4, watched: true },
  { id: 5, title: "Готель «Гранд Будапешт»", year: 2014, genre: "Комедія", rating: 8.1, watched: false },
  { id: 6, title: "Дюна", year: 2021, genre: "Пригоди", rating: 8.0, watched: false },
  { id: 7, title: "Паразити", year: 2019, genre: "Детектив", rating: 8.5, watched: true },
  { id: 8, title: "Темний лицар", year: 2008, genre: "Бойовик", rating: 9.0, watched: false }
];

// 1. map(): створює НОВИЙ масив із назвами, початкові фільми не змінює.
function getMovieTitles(movies) {
  return movies.map((movie) => movie.title);
}

// 2. filter(): повертає НОВИЙ масив фільмів із рейтингом від minRating включно.
function getTopRatedMovies(movies, minRating) {
  return movies.filter((movie) => movie.rating >= minRating);
}

// 3. find(): повертає ПЕРШИЙ об'єкт із потрібним id або undefined, якщо немає.
function findMovieById(movies, id) {
  return movies.find((movie) => movie.id === id);
}

// 4. filter(): залишає фільми потрібного жанру (точний збіг назви жанру).
function getMoviesByGenre(movies, genre) {
  return movies.filter((movie) => movie.genre === genre);
}

// 5. sort(): сортує масив. Через [...movies] спочатку створюємо його копію,
// тому початковий масив movies зберігає свій порядок.
function sortMoviesByRating(movies) {
  return [...movies].sort((first, second) => second.rating - first.rating);
}

// Демонстрація результатів у консолі.
console.log("1. Назви фільмів (map):");
console.log(getMovieTitles(movies));

console.log("\n2. Фільми з рейтингом 8.5 і вище (filter):");
console.table(getTopRatedMovies(movies, 8.5));

console.log("\n3. Пошук фільму з id = 3 (find):");
console.log(findMovieById(movies, 3));

console.log("\n4. Фільми жанру «Фантастика» (filter):");
console.table(getMoviesByGenre(movies, "Фантастика"));

console.log("\n5. За рейтингом від більшого до меншого (копія + sort):");
console.table(sortMoviesByRating(movies));

// Доводимо, що початковий порядок залишився незмінним.
console.log("\nПочатковий масив (порядок за id не змінився):");
console.log(movies.map((movie) => movie.id));
