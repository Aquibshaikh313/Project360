// ===============================
// QUIZ DATA
// ===============================

const questions = [
  {
    question: "Which company developed JavaScript?",
    answers: [
      { text: "Netscape", correct: true },
      { text: "Microsoft", correct: false },
      { text: "Sun Microsystems", correct: false },
      { text: "Oracle", correct: false }
    ]
  },

  // More questions...
];

// ===============================
// DOM ELEMENTS
// ===============================

const quest = document.getElementById("question");
const ans = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

// ===============================
// QUIZ STATE
// ===============================

let currentQuestionIndex = 0;
let score = 0;

// ===============================
// START QUIZ
// ===============================

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  nextBtn.innerHTML = "Next";
  nextBtn.classList.remove("playAgain");

  showQuestion();
}

// ===============================
// DISPLAY QUESTION
// ===============================

function showQuestion() {
  resetState();

  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;

  quest.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");

    button.innerHTML = answer.text;
    button.classList.add("btn");

    if (answer.correct) {
      button.dataset.correct = "true";
    }

    button.addEventListener("click", selectAnswer);

    ans.appendChild(button);
  });
}

// ===============================
// RESET QUESTION STATE
// ===============================

function resetState() {
  nextBtn.style.display = "none";
  ans.innerHTML = "";
}

// ===============================
// HANDLE ANSWER SELECTION
// ===============================

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(ans.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }

    button.disabled = true;
  });

  nextBtn.style.display = "block";
}

// ===============================
// SHOW FINAL SCORE
// ===============================

function showScore() {
  resetState();

  quest.innerHTML =
    `You scored ${score} out of ${questions.length}! 🎉`;

  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
  nextBtn.classList.add("playAgain");
}

// ===============================
// NEXT / RESTART BUTTON
// ===============================

nextBtn.addEventListener("click", () => {
  if (nextBtn.classList.contains("playAgain")) {
    startQuiz();
    return;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

// ===============================
// INITIALIZE APP
// ===============================

startQuiz();