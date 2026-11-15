// booking.js — функції для пошуку та бронювання.
import { rooms } from "./rooms.js";

// filter() повертає масив лише доступних номерів.
export function getAvailableRooms() {
  return rooms.filter((room) => room.available);
}

// find() знаходить номер за id або повертає undefined.
export function findRoom(id) {
  return rooms.find((room) => room.id === id);
}

// Повертає повідомлення про результат бронювання.
export function bookRoom(id, nights) {
  const room = findRoom(id);

  // Спочатку перевіряємо, чи номер існує.
  if (!room) {
    return "Номер з id " + id + " не знайдено";
  }

  // Далі перевіряємо доступність.
  if (!room.available) {
    return "Номер недоступний";
  }

  // Кількість ночей має бути додатним цілим числом.
  if (!Number.isInteger(nights) || nights <= 0) {
    return "Помилка: кількість ночей має бути додатним цілим числом";
  }

  const baseCost = room.price * nights;
  // Для бронювання від 5 ночей знижка 15% на всю суму.
  const totalCost = nights >= 5 ? baseCost * 0.85 : baseCost;

  // Після успішного бронювання номер більше не доступний.
  room.available = false;

  return totalCost + " грн" + (nights >= 5 ? " (зі знижкою 15%)" : "");
}
