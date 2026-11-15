"use strict";

// Навчальний конвертер. Дані не записуються в LocalStorage.
// Frankfurter v1 підтримує USD/EUR, але не UAH. Для гривні використовуємо v2.
const V1_API_URL = "https://api.frankfurter.dev/v1/latest";
const V2_API_URL = "https://api.frankfurter.dev/v2/rate";
const CURRENCIES = ["USD", "EUR", "UAH"];

const form = document.querySelector("#converter-form");
const amountInput = document.querySelector("#amount");
const fromSelect = document.querySelector("#from-currency");
const toSelect = document.querySelector("#to-currency");
const amountError = document.querySelector("#amount-error");
const convertButton = document.querySelector("#convert-button");
const loadingSpinner = document.querySelector("#loading-spinner");
const buttonLabel = document.querySelector("#button-label");
const errorMessage = document.querySelector("#error-message");
const resultCard = document.querySelector("#result-card");
const convertedAmount = document.querySelector("#converted-amount");
const rateDescription = document.querySelector("#rate-description");
const rateDate = document.querySelector("#rate-date");

function formatCurrency(value, currency) {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

// Керуємо індикатором завантаження та кнопкою.
function setLoading(isLoading) {
  convertButton.disabled = isLoading;
  loadingSpinner.classList.toggle("d-none", !isLoading);
  buttonLabel.textContent = isLoading ? "Завантаження курсу..." : "Конвертувати";
}

// Оновлення DOM: показуємо помилку або результат.
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("d-none");
  resultCard.classList.add("d-none");
}

function updateResult(amount, from, to, rate, date) {
  const result = calculateConversion(amount, rate);
  convertedAmount.textContent = formatCurrency(result, to);
  rateDescription.textContent = "1 " + from + " = " + rate.toLocaleString("uk-UA", { maximumFractionDigits: 6 }) + " " + to;
  rateDate.textContent = date;
  errorMessage.classList.add("d-none");
  resultCard.classList.remove("d-none");
}

// Розрахунок: значення множиться на курс 1 одиниці базової валюти.
function calculateConversion(amount, rate) {
  return amount * rate;
}

// Отримання курсу через fetch() та async/await.
// Перевіряємо response.ok і правильність відповіді перед обчисленням.
async function getExchangeRate(base, symbols) {
  if (!CURRENCIES.includes(base) || !CURRENCIES.includes(symbols)) {
    throw new Error("Обрано непідтримувану валюту.");
  }

  // У v1 немає UAH. Для пар із гривнею використовуємо офіційний v2 route.
  const usesHryvnia = base === "UAH" || symbols === "UAH";
  let url;

  if (usesHryvnia) {
    url = V2_API_URL + "/" + encodeURIComponent(base.toLowerCase())
      + "/" + encodeURIComponent(symbols.toLowerCase());
  } else {
    // Формуємо обов'язкові параметри base та symbols.
    const params = new URLSearchParams({ base, symbols });
    url = V1_API_URL + "?" + params.toString();
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Сервіс курсів повернув помилку HTTP " + response.status + ".");
  }

  const data = await response.json();
  // v1: { date, base, rates: { EUR: 0.86 } }
  // v2: { date, base, quote, rate }
  const rate = usesHryvnia ? data.rate : data.rates?.[symbols];
  const date = data.date;

  if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0 || typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("API не надав коректний курс або дату для цієї пари валют.");
  }

  return { rate, date };
}

// Подія submit не перезавантажує сторінку.
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  errorMessage.classList.add("d-none");
  resultCard.classList.add("d-none");

  // Сума повинна бути скінченним додатним числом.
  if (amountInput.value.trim() === "" || !Number.isFinite(amount) || amount <= 0) {
    amountInput.classList.add("is-invalid");
    showError("Введи суму, більшу за нуль.");
    return;
  }
  amountInput.classList.remove("is-invalid");

  // Однакові валюти: курс 1, без HTTP-запиту і без індикатора завантаження.
  if (from === to) {
    updateResult(amount, from, to, 1, "не потрібна — однакова валюта");
    return;
  }

  setLoading(true);
  try {
    const { rate, date } = await getExchangeRate(from, to);
    updateResult(amount, from, to, rate, date);
  } catch (error) {
    console.error("Помилка конвертації:", error);
    showError("Не вдалося отримати курс. " + error.message + " Спробуй пізніше.");
  } finally {
    // Виконується і після успішного запиту, і після помилки.
    setLoading(false);
  }
});

// При зміні полів прибираємо попередній результат, щоб він не вводив в оману.
amountInput.addEventListener("input", () => {
  amountInput.classList.remove("is-invalid");
  errorMessage.classList.add("d-none");
  resultCard.classList.add("d-none");
});
fromSelect.addEventListener("change", () => {
  errorMessage.classList.add("d-none");
  resultCard.classList.add("d-none");
});
toSelect.addEventListener("change", () => {
  errorMessage.classList.add("d-none");
  resultCard.classList.add("d-none");
});
