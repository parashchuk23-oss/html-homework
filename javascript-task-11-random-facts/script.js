"use strict";

// Адреса API, який повертає випадковий факт у JSON.
// Приклад відповіді: { "id": "...", "text": "...", "language": "en", ... }
const API_URL = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";

// Знаходимо HTML-елементи через DOM.
const factButton = document.querySelector("#get-fact-button");
const factText = document.querySelector("#fact-text");
const loadingMessage = document.querySelector("#loading-message");
const errorMessage = document.querySelector("#error-message");

// Оновлюємо DOM під час завантаження: блокуємо кнопку та показуємо повідомлення.
function setLoading(isLoading) {
  factButton.disabled = isLoading;
  loadingMessage.classList.toggle("d-none", !isLoading);
}

// Показуємо факт на сторінці без перезавантаження.
function showFact(text) {
  factText.textContent = text;
  errorMessage.classList.add("d-none");
}

// Показуємо зрозумілу помилку, якщо API недоступний.
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("d-none");
  factText.textContent = "Не вдалося завантажити новий факт.";
}

// Асинхронна функція отримання факту через fetch() і await.
async function getRandomFact() {
  setLoading(true);
  errorMessage.classList.add("d-none");

  try {
    // fetch() надсилає HTTP-запит; await чекає на відповідь.
    const response = await fetch(API_URL, { cache: "no-store" });

    // HTTP 404/500 — також помилка, навіть якщо fetch не завершився винятком.
    if (!response.ok) {
      throw new Error("Сервер повернув код " + response.status);
    }

    // Перетворюємо JSON-відповідь на JavaScript-об'єкт.
    const data = await response.json();

    // Перевіряємо, що API справді повернув текст факту.
    if (typeof data.text !== "string" || !data.text.trim()) {
      throw new Error("У відповіді немає тексту факту.");
    }

    showFact(data.text);
  } catch (error) {
    console.error("Помилка отримання факту:", error);
    showError("Не вдалося отримати факт. Перевір підключення до інтернету й спробуй ще раз.");
  } finally {
    // Нарешті прибираємо «Завантаження...» навіть після помилки.
    setLoading(false);
  }
}

// Користувач натискає кнопку — запускаємо отримання факту.
factButton.addEventListener("click", getRandomFact);
