"use strict";

// Масив expenses — поточний стан застосунку.
// В LocalStorage зберігаються тільки дані, а не HTML.
const STORAGE_KEY = "expense-tracker-expenses";
const CATEGORIES = ["Їжа", "Транспорт", "Покупки", "Інше"];
let expenses = [];
let nextId = 1;

// Знаходимо потрібні елементи сторінки.
const form = document.querySelector("#expense-form");
const nameInput = document.querySelector("#expense-name");
const amountInput = document.querySelector("#expense-amount");
const categorySelect = document.querySelector("#expense-category");
const expenseList = document.querySelector("#expense-list");
const emptyMessage = document.querySelector("#empty-message");
const totalAmount = document.querySelector("#total-amount");
const expenseCount = document.querySelector("#expense-count");

// Форматуємо число як суму в гривнях.
function formatMoney(value) {
  return value.toLocaleString("uk-UA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + " грн";
}

// Збереження: JSON.stringify перетворює масив об'єктів на рядок JSON.
function saveExpenses() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.warn("Не вдалося зберегти витрати:", error);
  }
}

// Відновлення: JSON.parse повертає масив із рядка.
// Відсутні або некоректні дані не повинні ламати застосунок.
function loadExpenses() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return [];

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    const ids = new Set();
    const valid = parsed.every((expense) => {
      if (expense === null || typeof expense !== "object" || Array.isArray(expense)) return false;
      if (!Number.isSafeInteger(expense.id) || expense.id <= 0 || ids.has(expense.id)) return false;
      if (typeof expense.name !== "string" || expense.name.trim().length === 0) return false;
      if (typeof expense.amount !== "number" || !Number.isFinite(expense.amount) || expense.amount <= 0) return false;
      if (!CATEGORIES.includes(expense.category)) return false;
      ids.add(expense.id);
      return true;
    });

    if (!valid) return [];

    return parsed.map((expense) => ({
      id: expense.id,
      name: expense.name,
      amount: expense.amount,
      category: expense.category
    }));
  } catch (error) {
    console.warn("Не вдалося відновити витрати:", error);
    return [];
  }
}

// renderExpenses() відображає актуальний масив на сторінці.
function renderExpenses() {
  // Очищаємо попередній список, щоб елементи не дублювалися.
  expenseList.textContent = "";

  // Для кожного об'єкта створюємо окремий пункт списку.
  expenses.forEach((expense) => {
    const item = document.createElement("li");
    item.className = "expense-item";

    const info = document.createElement("div");
    info.className = "expense-info";

    const name = document.createElement("div");
    name.className = "expense-name";
    name.textContent = expense.name; // безпечний вивід тексту

    const category = document.createElement("span");
    category.className = "expense-category";
    category.textContent = expense.category;

    info.append(name, category);

    const actions = document.createElement("div");
    actions.className = "expense-actions";

    const price = document.createElement("span");
    price.className = "expense-price";
    price.textContent = formatMoney(expense.amount);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "btn-delete";
    deleteButton.textContent = "Видалити";
    deleteButton.setAttribute("aria-label", "Видалити витрату: " + expense.name);

    deleteButton.addEventListener("click", () => {
      // filter() створює новий масив без видаленої витрати.
      expenses = expenses.filter((entry) => entry.id !== expense.id);
      saveExpenses();
      renderExpenses();
    });

    actions.append(price, deleteButton);
    item.append(info, actions);
    expenseList.append(item);
  });

  // reduce() підсумовує всі суми в масиві.
  // Рахуємо у копійках, щоб мінімізувати похибки дробових чисел.
  const totalCents = expenses.reduce(
    (sum, expense) => sum + Math.round(expense.amount * 100), 0
  );

  totalAmount.textContent = formatMoney(totalCents / 100);
  expenseCount.textContent = String(expenses.length);
  emptyMessage.classList.toggle("d-none", expenses.length > 0);
}

// Подія submit: перевіряємо форму, додаємо витрату, зберігаємо й оновлюємо UI.
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categorySelect.value;
  let valid = true;

  if (!name) {
    nameInput.classList.add("is-invalid");
    valid = false;
  } else {
    nameInput.classList.remove("is-invalid");
  }

  if (amountInput.value.trim() === "" || !Number.isFinite(amount) || amount <= 0 || Math.round(amount * 100) <= 0) {
    amountInput.classList.add("is-invalid");
    valid = false;
  } else {
    amountInput.classList.remove("is-invalid");
  }

  if (!CATEGORIES.includes(category)) valid = false;
  if (!valid) return;

  expenses.push({
    id: nextId,
    name: name,
    amount: Math.round(amount * 100) / 100,
    category: category
  });
  nextId++;

  saveExpenses();
  renderExpenses();
  form.reset();
  nameInput.focus();
});

// При виправленні введених даних прибираємо підсвічування помилки.
nameInput.addEventListener("input", () => nameInput.classList.remove("is-invalid"));
amountInput.addEventListener("input", () => amountInput.classList.remove("is-invalid"));

// Під час запуску відновлюємо дані та перемальовуємо інтерфейс.
expenses = loadExpenses();
nextId = expenses.reduce((maxId, expense) => Math.max(maxId, expense.id), 0) + 1;
renderExpenses();
