"use strict";

// STATE — джерело правди для інтерфейсу.
// Кожен об'єкт завдання має id, text і completed.
// Зберігаємо лише масив даних, без HTML чи DOM-елементів.
const STORAGE_KEY = "taskflow-tasks";
let tasks = [];
let nextTaskId = 1;

// Відновлюємо масив із LocalStorage. За відсутніх, пошкоджених або
// некоректних даних починаємо з порожнього списку.
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return [];

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    const ids = new Set();
    const valid = parsed.every((task) => {
      if (task === null || typeof task !== "object" || Array.isArray(task)) return false;
      if (!Number.isSafeInteger(task.id) || task.id <= 0 || ids.has(task.id)) return false;
      if (typeof task.text !== "string" || task.text.trim().length < 3) return false;
      if (typeof task.completed !== "boolean") return false;
      ids.add(task.id);
      return true;
    });

    // У разі некоректної структури не переносимо її до інтерфейсу.
    if (!valid) return [];

    // Залишаємо тільки поля id, text, completed.
    return parsed.map((task) => ({
      id: task.id,
      text: task.text,
      completed: task.completed
    }));
  } catch (error) {
    console.warn("Не вдалося відновити завдання з LocalStorage:", error);
    return [];
  }
}

// Викликається після кожної зміни tasks.
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    // Наприклад, сховище заблоковане браузером або переповнене.
    console.warn("Не вдалося зберегти завдання в LocalStorage:", error);
  }
}

// Отримуємо DOM-елементи (один раз після завантаження HTML).
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const emptyMessage = document.querySelector("#empty-message");
const activeCount = document.querySelector("#active-count");
const completedCount = document.querySelector("#completed-count");

// RENDER — малює інтерфейс на основі актуального масиву tasks.
// Цю функцію викликаємо ПІСЛЯ кожної зміни даних.
function renderTasks() {
  // Прибираємо старі елементи списку, щоб не було дублікатів.
  taskList.textContent = "";

  // forEach проходить по кожному об'єкту в масиві tasks.
  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = "task-item";
    if (task.completed) {
      item.classList.add("is-completed");
    }

    // Чекбокс відповідає за стан виконання.
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Виконано: " + task.text);

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked; // оновили state
      saveTasks(); // зберегли дані в LocalStorage
      renderTasks(); // оновили інтерфейс
    });

    // textContent безпечно показує назву як звичайний текст.
    const title = document.createElement("span");
    title.className = "task-text";
    title.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "btn-delete";
    deleteButton.textContent = "Видалити";
    deleteButton.setAttribute("aria-label", "Видалити: " + task.text);

    deleteButton.addEventListener("click", () => {
      // filter створює новий масив без вибраного завдання.
      tasks = tasks.filter((currentTask) => currentTask.id !== task.id);
      saveTasks();
      renderTasks();
    });

    // append додає створені вузли всередину пункту списку.
    item.append(checkbox, title, deleteButton);
    taskList.append(item);
  });

  // filter повертає окремі списки активних і виконаних.
  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  activeCount.textContent = activeTasks.length;
  completedCount.textContent = completedTasks.length;

  // Коли завдань немає, показуємо підказку замість списку.
  emptyMessage.classList.toggle("d-none", tasks.length > 0);
}

// addEventListener реагує на відправлення форми (Enter або кнопка «Додати»).
taskForm.addEventListener("submit", (event) => {
  event.preventDefault(); // форма не перезавантажує сторінку

  const text = taskInput.value.trim();
  if (text.length < 3) {
    taskInput.classList.add("is-invalid");
    taskInput.focus();
    return;
  }

  // Додаємо новий об'єкт до стану. id не повторюється у межах сеансу.
  tasks.push({ id: nextTaskId, text: text, completed: false });
  nextTaskId++;
  saveTasks();

  taskInput.value = "";
  taskInput.classList.remove("is-invalid");
  renderTasks();
  taskInput.focus();
});

// Коли користувач виправляє назву, прибираємо повідомлення про помилку.
taskInput.addEventListener("input", () => {
  taskInput.classList.remove("is-invalid");
});

// Під час відкриття сторінки відновлюємо дані та показуємо їх.
tasks = loadTasks();
// Наступний id більший за всі збережені — без повторного використання id.
nextTaskId = tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
renderTasks();
