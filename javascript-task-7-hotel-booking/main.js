// main.js — запуск і приклади використання функцій з інших модулів.
import { getAvailableRooms, findRoom, bookRoom } from "./booking.js";

console.log("Доступні номери до бронювання:");
console.table(getAvailableRooms());

console.log("\nПошук номера з id = 2:");
console.log(findRoom(2));

console.log("\nРезультати бронювань:");
console.log("bookRoom(1, 3):", bookRoom(1, 3)); // 4500 грн
console.log("bookRoom(2, 5):", bookRoom(2, 5)); // 10625 грн (зі знижкою 15%)
console.log("bookRoom(3, 2):", bookRoom(3, 2)); // Номер недоступний

// Додаткові перевірки: повторне бронювання й неіснуючий номер.
console.log("Повторне бронювання id = 1:", bookRoom(1, 2)); // Номер недоступний
console.log("Неіснуючий id = 99:", bookRoom(99, 2)); // Номер не знайдено
console.log("Некоректна кількість ночей:", bookRoom(4, 0)); // Помилка

console.log("\nДоступні номери після бронювання:");
console.table(getAvailableRooms()); // залишився лише номер id = 4
