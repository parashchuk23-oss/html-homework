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


// Завдання 2 + 3. Калькулятор з категоріями та промокодом
const ticketForm = document.getElementById("ticket-form");
const ticketCountInput = document.getElementById("tickets-count");
const ticketCategoryInput = document.getElementById("ticket-category");
const ticketPromoInput = document.getElementById("ticket-promo");
const ticketResult = document.getElementById("ticket-result");
const ticketMessage = document.getElementById("ticket-message");

const ticketPrices = { standard: 400, vip: 800 };
const promoCode = "EVENT50";
const promoValue = 50;

function calculateTicketOrder(quantity, category, promo) {
  const ticketPrice = ticketPrices[category];
  if (!Number.isSafeInteger(quantity) || quantity <= 0 || ticketPrice === undefined) {
    return null;
  }

  let discountPercent = 0;
  if (quantity >= 5) {
    discountPercent = 20;
  } else if (quantity >= 3) {
    discountPercent = 10;
  } else {
    discountPercent = 0;
  }

  const originalPrice = ticketPrice * quantity;
  const quantityDiscount = originalPrice * discountPercent / 100;
  const afterQuantityDiscount = originalPrice - quantityDiscount;
  const promoApplied = promo.trim().toUpperCase() === promoCode;
  const promoDiscount = promoApplied ? Math.min(promoValue, afterQuantityDiscount) : 0;
  const finalPrice = Math.max(0, afterQuantityDiscount - promoDiscount);

  return {
    quantity, category, ticketPrice, discountPercent, originalPrice,
    quantityDiscount, promoDiscount, promoApplied, finalPrice
  };
}

function clearTicketResult() {
  ticketCountInput.classList.remove("is-invalid");
  ticketCountInput.removeAttribute("aria-invalid");
  ticketResult.classList.add("d-none");
  ticketMessage.classList.add("d-none");
}

[ticketCountInput, ticketCategoryInput, ticketPromoInput].forEach((input) => {
  input.addEventListener("input", clearTicketResult);
  input.addEventListener("change", clearTicketResult);
});

ticketForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const quantity = Number(ticketCountInput.value);
  const category = ticketCategoryInput.value;
  const promo = ticketPromoInput.value;
  const validQuantity =
    ticketCountInput.value.trim() !== "" &&
    Number.isSafeInteger(quantity) &&
    quantity > 0;
  const validCategory = Object.hasOwn(ticketPrices, category);

  ticketCountInput.classList.toggle("is-invalid", !validQuantity);
  ticketCountInput.setAttribute("aria-invalid", String(!validQuantity));
  ticketCategoryInput.classList.toggle("is-invalid", !validCategory);

  if (!validQuantity || !validCategory) {
    ticketResult.classList.add("d-none");
    ticketMessage.textContent = "Помилка: виберіть категорію та введіть цілу кількість квитків, більшу за нуль.";
    ticketMessage.classList.remove("d-none");
    (validCategory ? ticketCountInput : ticketCategoryInput).focus();
    return;
  }

  const order = calculateTicketOrder(quantity, category, promo);
  if (order === null) return;

  ticketMessage.classList.add("d-none");
  const currency = (value) => value.toLocaleString("uk-UA") + " грн";

  document.getElementById("ticket-category-label").textContent =
    category === "vip" ? "VIP" : "Standard";
  document.getElementById("ticket-unit-price").textContent =
    quantity + " × " + currency(order.ticketPrice);
  document.getElementById("ticket-original").textContent =
    currency(order.originalPrice);
  document.getElementById("ticket-rate").textContent =
    String(order.discountPercent);
  document.getElementById("ticket-discount").textContent =
    "−" + currency(order.quantityDiscount);
  document.getElementById("ticket-promo-label").textContent =
    order.promoApplied ? "(EVENT50)" : "(не застосовано)";
  document.getElementById("ticket-promo-discount").textContent =
    "−" + currency(order.promoDiscount);
  document.getElementById("ticket-total").textContent =
    currency(order.finalPrice);
  ticketResult.classList.remove("d-none");
});
