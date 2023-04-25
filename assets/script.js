// Quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["London", "Paris", "Berlin", "Madrid"],
    answer: 1,
  },
  {
    question: "What is 2 + 2?",
    choices: ["1", "2", "3", "4"],
    answer: 3,
  },
  {
    question: "What is the largest planet in our solar system?",
    choices: ["Saturn", "Jupiter", "Neptune", "Uranus"],
    answer: 1,
  },
  {
    question: "What language is used to style web pages?",
    choices: ["JavaScript", "HTML", "CSS", "Python"],
    answer: 2,
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Ottawa", "Montreal", "Vancouver"],
    answer: 1,
  },
];

// Quiz variables
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const choicesEl = document.querySelector(".choices");
const resultContainer = document.querySelector(".result-container");
const scoreEl = document.getElementById("score");
const initialsEl = document.getElementById("initials");
const saveBtn = document.getElementById("save");
const startButton = document.getElementById("start");
const highscoresButton = document.getElementById("highscores-button");
const highscoresContainer = document.getElementById("highscores-container");
const highscoresList = document.getElementById("highscores-list");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

// Start quiz function
function startQuiz() {
  // Hide the start button and show the quiz container
  startButton.classList.add("hide");
  quizContainer.classList.remove("hide");

  // Start the timer
  timerInterval = setInterval(function () {
    timeLeft--;
    if (timeLeft === 0) {
      endQuiz();
    }
  }, 1000);

  // Load the first question
  loadQuestion();
}

// Load question function
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  choicesEl.innerHTML = "";
  currentQuestion.choices.forEach(function (choice, i) {
    const button = document.createElement("button");
    button.classList.add("choice");
    button.setAttribute("data-id", i);
    button.textContent = choice;
    button.onclick = answerQuestion;
    choicesEl.appendChild(button);
  });
}

// Answer question function
function answerQuestion() {
  const selectedAnswer = parseInt(this.dataset.id);
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.answer) {
    score++;
  } else {
    timeLeft -= 10;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length || timeLeft === 0) {
    endQuiz();
  } else {
    loadQuestion();
  }
}

// End quiz function
function endQuiz() {
  clearInterval(timerInterval);

  quizContainer.classList.add("hide");
  resultContainer.classList.remove("hide");

  scoreEl.textContent = score;

  saveBtn.onclick = function (e) {
    e.preventDefault();
    const initials = initialsEl.value;
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push({ initials, score });
    localStorage.setItem("highscores", JSON.stringify(highscores));
    showHighscores();
  };
}

// Show highscores function
function showHighscores() {
  resultContainer.classList.add("hide");
  highscoresContainer.classList.remove("hide");
  highscoresList.innerHTML = "";

  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores
    .sort(function (a, b) {
      return b.score - a.score;
    })
    .forEach(function (score) {
      const li = document.createElement("li");
      li.textContent = `${score.initials} - ${score.score}`;
      highscoresList.appendChild(li);
    });
}

// View highscores button click event
highscoresButton.onclick = function () {
  startButton.classList.add("hide");
  quizContainer.classList.add("hide");
  resultContainer.classList.add("hide");
  highscoresContainer.classList.remove("hide");

  showHighscores();
};
