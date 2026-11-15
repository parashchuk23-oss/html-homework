"use strict";

// Навчальна форма: не надсилає дані на сервер і нічого не зберігає.
// Паролі перевіряються лише в пам'яті сторінки під час введення.

const form = document.querySelector("#registration-form");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmInput = document.querySelector("#confirm-password");
const termsCheckbox = document.querySelector("#agree-terms");
const successMessage = document.querySelector("#success-message");

// Показуємо повідомлення про помилку під конкретним полем.
function showError(input, errorId, message) {
  const errorElement = document.querySelector(errorId);
  errorElement.textContent = message;
  input.classList.add("is-invalid");
  input.setAttribute("aria-invalid", "true");
}

// Прибираємо помилку з конкретного поля.
function clearError(input, errorId) {
  document.querySelector(errorId).textContent = "";
  input.classList.remove("is-invalid");
  input.removeAttribute("aria-invalid");
}

// Перевірка імені: після видалення пробілів має бути хоча б 3 символи.
function validateUsername() {
  const username = usernameInput.value.trim();
  if (username.length < 3) {
    showError(usernameInput, "#username-error", "Ім'я повинно містити мінімум 3 символи.");
    return false;
  }
  clearError(usernameInput, "#username-error");
  return true;
}

// Проста перевірка формату email для навчального завдання.
// Це не підтверджує, що адреса реально існує.
function validateEmail() {
  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showError(emailInput, "#email-error", "Введи коректний email (наприклад, name@example.com).");
    return false;
  }
  clearError(emailInput, "#email-error");
  return true;
}

// Перевіряємо мінімальну довжину пароля. Пароль ніде не зберігається.
function validatePassword() {
  if (passwordInput.value.length < 8) {
    showError(passwordInput, "#password-error", "Пароль повинен містити мінімум 8 символів.");
    return false;
  }
  clearError(passwordInput, "#password-error");
  return true;
}

// Пароль і підтвердження мають збігатися.
function validateConfirmation() {
  if (confirmInput.value === "" || confirmInput.value !== passwordInput.value) {
    showError(confirmInput, "#confirm-error", "Паролі повинні збігатися.");
    return false;
  }
  clearError(confirmInput, "#confirm-error");
  return true;
}

// Погодження з умовами обов'язкове.
function validateTerms() {
  const error = document.querySelector("#terms-error");
  if (!termsCheckbox.checked) {
    error.textContent = "Потрібно погодитися з умовами.";
    error.classList.add("visible");
    termsCheckbox.setAttribute("aria-invalid", "true");
    return false;
  }
  error.textContent = "";
  error.classList.remove("visible");
  termsCheckbox.removeAttribute("aria-invalid");
  return true;
}

// Перевіряємо всі поля, навіть якщо перше вже має помилку.
form.addEventListener("submit", (event) => {
  event.preventDefault(); // без перезавантаження сторінки
  successMessage.classList.add("d-none");

  const validUsername = validateUsername();
  const validEmail = validateEmail();
  const validPassword = validatePassword();
  const validConfirmation = validateConfirmation();
  const validTerms = validateTerms();

  if (validUsername && validEmail && validPassword && validConfirmation && validTerms) {
    successMessage.textContent = "Реєстрація успішна!";
    successMessage.classList.remove("d-none");
    // Це лише повідомлення: обліковий запис не створюється.
    // Очищення форми також прибирає пароль із полів після успіху.
    form.reset();
  }
});

// При введенні одразу перевіряємо відповідне поле і прибираємо старе повідомлення про успіх.
usernameInput.addEventListener("input", () => {
  successMessage.classList.add("d-none");
  validateUsername();
});
emailInput.addEventListener("input", () => {
  successMessage.classList.add("d-none");
  validateEmail();
});
passwordInput.addEventListener("input", () => {
  successMessage.classList.add("d-none");
  validatePassword();
  // Зміна пароля може порушити збіг із підтвердженням.
  if (confirmInput.value !== "") validateConfirmation();
});
confirmInput.addEventListener("input", () => {
  successMessage.classList.add("d-none");
  validateConfirmation();
});
termsCheckbox.addEventListener("change", () => {
  successMessage.classList.add("d-none");
  validateTerms();
});
