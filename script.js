// Links to HTML
const quizContainer = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const submitButton = document.getElementById('submit');
const scoreElement = document.getElementById('points');
const timerElement = document.getElementById('timer');

// Array of questions for the quiz
const questions = [
    {
      question: "What is the correct syntax for creating a new array?",
      choices: [
        "var myArray = []",
        "var myArray = {}",
        "var myArray = new Array()",
        "var myArray = Array()",
      ],
      answer: "var myArray = []"
    },
    {
      question: "What is the result of the expression 5 + '5'?",
      choices: [
        "10",
        "55",
        "undefined",
        "NaN",
      ],
      answer: "55"
    },
    {
      question: "What is the output of the following code?\nconsole.log(1 + '2' + '3');",
      choices: [
        "6",
        "123",
        "15",
        "undefined",
      ],
      answer: "123"
    },
    {
      question: "What is the correct way to define a function in JavaScript?",
      choices: [
        "function myFunction() {}",
        "var myFunction = function() {}",
        "myFunction = function() {}",
        "All of the above",
      ],
      answer: "All of the above"
    },
    {
      question: "Which keyword is used to declare a variable with block scope?",
      choices: [
        "var",
        "let",
        "const",
        "None of the above",
      ],
      answer: "let"
    }
  ];
  
// Sets initial values
let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;

// Cycles through questions
function displayQuestion(question) {
    questionElement.innerText = question.question;
    choicesElement.innerHTML = '';
    for (let i = 0; i < question.choices.length; i++) {
      const li = document.createElement('li');
      li.innerText = question.choices[i];
      li.addEventListener('click', () => {
        clearInterval(timer);
        if (li.innerText === question.answer) {
          score += timeLeft;
          scoreElement.innerText = score;
        } else {
          timeLeft -= 10;
          if (timeLeft < 0) {
            timeLeft = 0;
          };
        };
        if (currentQuestion < questions.length - 1) {
          currentQuestion++;
          displayQuestion(questions[currentQuestion]);
        } else {
          endGame();
        };
      });
      choicesElement.appendChild(li);
    };
    timer = setInterval(updateTimer, 1000);
  };

// Sets the timer to tick down, ends the game when time runs out
function updateTimer() {
    if (timeLeft > 0) {
      timeLeft--;
      timerElement.innerText = `Time left: ${timeLeft} seconds`;
    } else {
      clearInterval(timer);
      endGame();
    };
  };
  
// Clears the game and displays the final score
function endGame() {
    clearInterval(timer);
    questionElement.innerText = `You've completed the quiz with a score of ${score}!`;
    choicesElement.innerHTML = '';
    submitButton.style.display = 'none';
    timerElement.style.display = 'none';
  };
  
// Begins the quiz and starts the timer
displayQuestion(questions[currentQuestion]);
timerElement.innerText = `Time left: ${timeLeft} seconds`;
  