"use strict";

// STATE — джерело правди для інтерфейсу.
// Кожен об'єкт завдання має id, text і completed.
// Дані зберігаються тільки в пам'яті вкладки браузера.
let tasks = [];
let nextTaskId = 1;

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

  taskInput.value = "";
  taskInput.classList.remove("is-invalid");
  renderTasks();
  taskInput.focus();
});

// Коли користувач виправляє назву, прибираємо повідомлення про помилку.
taskInput.addEventListener("input", () => {
  taskInput.classList.remove("is-invalid");
});

// Перший рендер: список порожній, лічильники дорівнюють нулю.
renderTasks();
