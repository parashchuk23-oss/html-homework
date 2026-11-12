"use strict";

// П'ять питань, кожне має рівно три варіанти.
// correct — індекс правильної відповіді (0, 1 або 2).
const questions = [
  {
    text: "Яким словом оголошують змінну, яку можна перепризначати?",
    answers: ["const", "let", "return"],
    correct: 1
  },
  {
    text: "Який метод створює новий масив із перетворених елементів?",
    answers: ["map()", "push()", "find()"],
    correct: 0
  },
  {
    text: "Що робить addEventListener()?",
    answers: ["Сортує масив", "Видаляє сторінку", "Додає обробник події"],
    correct: 2
  },
  {
    text: "Яка властивість змінює текст DOM-елемента?",
    answers: ["classList", "textContent", "setInterval"],
    correct: 1
  },
  {
    text: "Яка функція зупиняє таймер, створений setInterval()?",
    answers: ["clearInterval()", "querySelector()", "filter()"],
    correct: 0
  }
];

// Знаходимо HTML-елементи один раз за допомогою querySelector().
const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const startForm = document.querySelector("#start-form");
const playerNameInput = document.querySelector("#player-name");
const questionTitle = document.querySelector("#question-title");
const questionCounter = document.querySelector("#question-counter");
const answersBox = document.querySelector("#answers");
const nextButton = document.querySelector("#next-button");
const answerError = document.querySelector("#answer-error");
const timerText = document.querySelector("#timer");
const timerPill = document.querySelector("#timer-pill");
const progressBar = document.querySelector("#progress-bar");
const progress = document.querySelector("#quiz-progress");
const resultGreeting = document.querySelector("#result-greeting");
const resultScore = document.querySelector("#result-score");
const resultMessage = document.querySelector("#result-message");
const restartButton = document.querySelector("#restart-button");
const summaryName = document.querySelector("#summary-name");
const summaryCorrect = document.querySelector("#summary-correct");
const summaryTotal = document.querySelector("#summary-total");
const summaryTime = document.querySelector("#summary-time");

// Змінні, які змінюватимуться під час гри.
let playerName = "";
let currentQuestion = 0;
let selectedAnswer = null;
let score = 0;
let secondsLeft = 60;
let timerId = null;
let quizFinished = false;
const QUIZ_SECONDS = 60;

// Вмикаємо лише потрібний екран. classList змінює класи CSS.
function showScreen(screen) {
  startScreen.classList.add("d-none");
  quizScreen.classList.add("d-none");
  resultScreen.classList.add("d-none");
  screen.classList.remove("d-none");
}

// Показуємо поточне питання та створюємо три кнопки відповіді.
function showQuestion() {
  const question = questions[currentQuestion];
  selectedAnswer = null;
  answerError.classList.add("d-none");

  questionTitle.textContent = question.text;
  questionCounter.textContent = "Питання " + (currentQuestion + 1) + " з " + questions.length;
  nextButton.textContent = currentQuestion === questions.length - 1
    ? "Завершити"
    : "Наступне питання →";

  answersBox.textContent = ""; // прибираємо кнопки попереднього питання

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = (index + 1) + ". " + answer;

    // Подія click: виділяємо обраний варіант.
    button.addEventListener("click", () => {
      selectedAnswer = index;

      // Знімаємо виділення з усіх кнопок і додаємо його поточній.
      answersBox.querySelectorAll(".answer-button").forEach((item) => {
        item.classList.remove("selected");
        item.setAttribute("aria-pressed", "false");
      });
      button.classList.add("selected");
      button.setAttribute("aria-pressed", "true");
      answerError.classList.add("d-none");
    });

    answersBox.appendChild(button);
  });

  // Оновлюємо прогрес.
  const percent = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = percent + "%";
  progress.setAttribute("aria-valuenow", String(currentQuestion + 1));
}

// Таймер один на всю вікторину, а не на кожне питання.
function startTimer() {
  // Перед запуском очищаємо старий інтервал.
  clearInterval(timerId);
  timerId = null;
  timerText.textContent = secondsLeft;

  timerId = setInterval(() => {
    if (quizFinished) return;

    secondsLeft--;
    timerText.textContent = secondsLeft;
    timerPill.classList.toggle("timer-warning", secondsLeft <= 10);

    if (secondsLeft <= 0) {
      finishQuiz(true);
    }
  }, 1000);
}

// Завершення: зупиняємо таймер і показуємо набрані бали.
function finishQuiz(timeIsUp) {
  if (quizFinished) return;
  quizFinished = true;
  clearInterval(timerId);
  timerId = null;

  // Таблиця відображає тільки поточне проходження.
  const elapsedSeconds = Math.max(0, Math.min(QUIZ_SECONDS, QUIZ_SECONDS - secondsLeft));
  summaryName.textContent = playerName;
  summaryCorrect.textContent = String(score);
  summaryTotal.textContent = String(questions.length);
  summaryTime.textContent = elapsedSeconds + " с";

  resultGreeting.textContent = playerName + ", твій результат:";
  resultScore.textContent = score + " / " + questions.length;
  resultMessage.textContent = timeIsUp
    ? "Час вийшов! Зараховані лише відповіді, які ти підтвердив."
    : score === questions.length
      ? "Відмінно! Ти відповів правильно на всі питання."
      : "Готово! Можеш повторити спробу й покращити результат.";
  showScreen(resultScreen);
}

// Подія input: прибираємо червону підсвітку, коли ім'я змінюється.
playerNameInput.addEventListener("input", () => {
  playerNameInput.classList.remove("is-invalid");
});

// Подія submit: перевірка імені та початок вікторини.
startForm.addEventListener("submit", (event) => {
  event.preventDefault(); // не перезавантажуємо сторінку

  const name = playerNameInput.value.trim();
  if (name.length < 3) {
    playerNameInput.classList.add("is-invalid");
    playerNameInput.focus();
    return;
  }

  // Захист від дублювання інтервалів при будь-якому повторному старті.
  clearInterval(timerId);
  timerId = null;
  playerName = name;
  currentQuestion = 0;
  selectedAnswer = null;
  score = 0;
  secondsLeft = QUIZ_SECONDS;
  quizFinished = false;
  timerPill.classList.remove("timer-warning");

  showScreen(quizScreen);
  showQuestion();
  startTimer();
});

// Подія click: підтверджуємо відповідь та переходимо далі.
nextButton.addEventListener("click", () => {
  if (quizFinished) return;

  if (selectedAnswer === null) {
    answerError.classList.remove("d-none");
    return;
  }

  if (selectedAnswer === questions[currentQuestion].correct) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion >= questions.length) {
    finishQuiz(false);
  } else {
    showQuestion();
  }
});

// Подія click: повторна спроба, ім'я зберігається у полі.
restartButton.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
  quizFinished = false;
  score = 0;
  currentQuestion = 0;
  secondsLeft = QUIZ_SECONDS;
  selectedAnswer = null;
  timerText.textContent = secondsLeft;
  timerPill.classList.remove("timer-warning");
  showScreen(startScreen);
  playerNameInput.focus();
});
