"use strict";

// Завдання: масив із 8 об'єктів фільмів.
// Масив [] зберігає список; кожен об'єкт {} описує окремий фільм.
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

// 1. Звернення до властивостей об'єкта.
console.log("=== Властивості першого фільму ===");
console.log("Назва:", movies[0].title);       // доступ через крапку
console.log("Рік:", movies[0]["year"]);      // доступ через квадратні дужки
console.log("Рейтинг:", movies[0].rating);
console.log("Переглянуто:", movies[0].watched);

// 2. Додаємо дев'ятий фільм за допомогою push().
movies.push({
  id: 9,
  title: "Назад у майбутнє",
  year: 1985,
  genre: "Комедія / фантастика",
  rating: 8.5,
  watched: false
});
console.log("\n=== Після додавання фільму ===");
console.log("Кількість фільмів:", movies.length);
console.log("Доданий фільм:", movies[movies.length - 1]);

// 3. Змінюємо watched: фільм «Зелена книга» тепер переглянуто.
movies[2].watched = true;
console.log("\n=== Після зміни watched ===");
console.log(movies[2].title + " — переглянуто:", movies[2].watched);

// 4. Виводимо всі фільми в консоль.
console.log("\n=== Усі фільми ===");
console.table(movies);
