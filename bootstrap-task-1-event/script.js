"use strict";

// Демонстраційна форма: перевірка виконується у браузері, без надсилання даних.
const form = document.getElementById("registration-form");
const nameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const participantsInput = document.getElementById("participants");
const message = document.getElementById("form-message");

function markField(input, valid) {
  input.classList.toggle("is-invalid", !valid);
  input.classList.toggle("is-valid", valid);
  input.setAttribute("aria-invalid", String(!valid));
}

function hideMessage() {
  message.className = "alert mt-3 mb-0 d-none";
  message.textContent = "";
}

[nameInput, emailInput, participantsInput].forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("is-invalid", "is-valid");
    input.removeAttribute("aria-invalid");
    hideMessage();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameValid = nameInput.value.trim().length > 0;
  const emailValid = emailInput.value.trim().length > 0 && emailInput.validity.valid;
  const count = Number(participantsInput.value);
  const participantsValid =
    participantsInput.value.trim() !== "" &&
    Number.isInteger(count) &&
    count > 0;

  markField(nameInput, nameValid);
  markField(emailInput, emailValid);
  markField(participantsInput, participantsValid);

  const allValid = nameValid && emailValid && participantsValid;
  message.className = "alert mt-3 mb-0 " + (allValid ? "alert-success" : "alert-danger");
  message.textContent = allValid
    ? "Реєстрація успішна!"
    : "Помилка: перевірте ім'я, email та кількість учасників (має бути більше нуля).";

  if (!allValid) {
    [nameInput, emailInput, participantsInput]
      .find((input) => input.classList.contains("is-invalid"))
      ?.focus();
  }
});
