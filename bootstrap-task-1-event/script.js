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


// Завдання 2. Калькулятор вартості квитків
const ticketForm = document.getElementById("ticket-form");
const ticketCountInput = document.getElementById("tickets-count");
const ticketResult = document.getElementById("ticket-result");
const ticketMessage = document.getElementById("ticket-message");

const ticketPrice = 400; // вартість одного квитка, грн

ticketForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const quantity = Number(ticketCountInput.value);
  const validQuantity =
    ticketCountInput.value.trim() !== "" &&
    Number.isInteger(quantity) &&
    quantity > 0;

  ticketCountInput.classList.toggle("is-invalid", !validQuantity);
  ticketCountInput.setAttribute("aria-invalid", String(!validQuantity));

  if (!validQuantity) {
    ticketResult.classList.add("d-none");
    ticketMessage.textContent = "Помилка: введіть цілу кількість квитків, більшу за нуль.";
    ticketMessage.classList.remove("d-none");
    ticketCountInput.focus();
    return;
  }

  ticketMessage.classList.add("d-none");

  // let — змінна, її значення залежить від кількості квитків
  let discountPercent = 0;

  if (quantity >= 5) {
    discountPercent = 20;
  } else if (quantity >= 3) {
    discountPercent = 10;
  } else {
    discountPercent = 0;
  }

  // const — результати одного конкретного розрахунку
  const originalPrice = ticketPrice * quantity;
  const discountAmount = originalPrice * discountPercent / 100;
  const finalPrice = originalPrice - discountAmount;

  document.getElementById("ticket-original").textContent = originalPrice + " грн";
  document.getElementById("ticket-rate").textContent = String(discountPercent);
  document.getElementById("ticket-discount").textContent = "−" + discountAmount + " грн";
  document.getElementById("ticket-total").textContent = finalPrice + " грн";
  ticketResult.classList.remove("d-none");
});

ticketCountInput.addEventListener("input", () => {
  ticketCountInput.classList.remove("is-invalid");
  ticketCountInput.removeAttribute("aria-invalid");
  ticketMessage.classList.add("d-none");
  ticketResult.classList.add("d-none");
});
