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
  {
    question: "What keyword is used to declare a constant in JavaScript?",
    answers: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: true },
      { text: "constant", correct: false }
    ]
  },
  {
    question: "What will typeof null return in JavaScript?",
    answers: [
      { text: "null", correct: false },
      { text: "object", correct: true },
      { text: "undefined", correct: false },
      { text: "string", correct: false }
    ]
  },
  {
    question: "Which method adds one or more elements to the end of an array?",
    answers: [
      { text: "push()", correct: true },
      { text: "pop()", correct: false },
      { text: "shift()", correct: false },
      { text: "unshift()", correct: false }
    ]
  },
  {
    question: "What does the '===' operator do in JavaScript?",
    answers: [
      { text: "Compares values only", correct: false },
      { text: "Compares values and types", correct: true },
      { text: "Assigns a value", correct: false },
      { text: "Checks for null or undefined", correct: false }
    ]
  },
  {
    question: "Which of these is NOT a JavaScript framework or library?",
    answers: [
      { text: "React", correct: false },
      { text: "Angular", correct: false },
      { text: "Vue", correct: false },
      { text: "Django", correct: true }
    ]
  },
  {
    question: "What does the 'this' keyword refer to in JavaScript?",
    answers: [
      { text: "The current function", correct: false },
      { text: "The global object", correct: false },
      { text: "The object it belongs to", correct: true },
      { text: "The parent object", correct: false }
    ]
  },
  {
    question: "Which method converts a JSON string to a JavaScript object?",
    answers: [
      { text: "JSON.parse()", correct: true },
      { text: "JSON.stringify()", correct: false },
      { text: "JSON.toObject()", correct: false },
      { text: "JSON.convert()", correct: false }
    ]
  },
  {
    question: "What is the purpose of the 'use strict' directive?",
    answers: [
      { text: "To enforce stricter type checking", correct: false },
      { text: "To enable ES6 features", correct: false },
      { text: "To enforce stricter parsing and error handling", correct: true },
      { text: "To optimize code performance", correct: false }
    ]
  },
  {
    question: "What is hoisting in JavaScript?",
    answers: [
      { text: "Moving variable declarations to the top of their scope", correct: true },
      { text: "A type of variable", correct: false },
      { text: "A way to optimize code", correct: false },
      { text: "A method for importing modules", correct: false }
    ]
  },
  {
    question: "Which of these is a falsy value in JavaScript?",
    answers: [
      { text: "true", correct: false },
      { text: "1", correct: false },
      { text: "[]", correct: false },
      { text: "0", correct: true }
    ]
  },
  {
    question: "What does the Array.map() method do?",
    answers: [
      { text: "Modifies the original array", correct: false },
      { text: "Creates a new array with transformed elements", correct: true },
      { text: "Filters array elements", correct: false },
      { text: "Sorts array elements", correct: false }
    ]
  }
];

// Get references to HTML elements
const quest = document.getElementById("question"); // The question text element
const ans = document.getElementById("answer-buttons"); // Container for answer buttons
const nextBtn = document.getElementById("next-btn"); // Next/Play Again button

// Variables to track quiz state
let currentQuestionIndex = 0; // Index of current question being displayed
let score = 0; // Count of correct answers

// Function to initialize and start the quiz
function startQuiz() {
  currentQuestionIndex = 0; // Reset to first question
  score = 0; // Reset score
  nextBtn.innerHTML = "Next"; // Set button text to "Next"
  nextBtn.classList.remove("playAgain"); // Remove playAgain class if it exists
  showQuestion(); // Display the first question
}

// Function to display the current question
function showQuestion() {
  resetState(); // Clear previous question and answers

  let currentQuestion = questions[currentQuestionIndex]; // Get current question object
  let questionNo = currentQuestionIndex + 1; // Calculate question number (1-based)
  quest.innerHTML = questionNo + ". " + currentQuestion.question; // Display question text

  // Create a button for each answer option
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button"); // Create new button element
    button.innerHTML = answer.text; // Set button text to answer text
    button.classList.add("btn"); // Add CSS class for styling
    if (answer.correct) {
      button.dataset.correct = "true"; // Mark correct answer with data attribute
    }
    button.addEventListener("click", selectAnswer); // Add click event handler
    ans.appendChild(button); // Add button to answer container
  });
}

// Function to reset the question state
function resetState() { 
  nextBtn.style.display = "none"; // Hide Next button initially
  ans.innerHTML = ""; // Clear all answer buttons from previous question
}

// Function to handle when an answer is selected
function selectAnswer(e) {
  const selectedBtn = e.target; // Get the clicked button
  const isCorrect = selectedBtn.dataset.correct === "true"; // Check if it's correct

  // Style the selected answer (green if correct, red if wrong)
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++; // Increment score if correct
  } else {
    selectedBtn.classList.add("incorrect");
  }

  // Highlight all correct answers and disable all buttons
  Array.from(ans.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct"); // Highlight correct answer
    }
    button.disabled = true; // Disable all buttons after selection
  });

  nextBtn.style.display = "block"; // Show Next button
}

// Function to display final score
function showScore() {
  resetState(); // Clear the question and answers
  quest.innerHTML = `You scored ${score} out of ${questions.length}! 🎉`; // Show score
  nextBtn.innerHTML = "Play Again"; // Change button text
  nextBtn.style.display = "block"; // Show the button
  nextBtn.classList.add("playAgain"); // Add class for styling if needed
}

// Event listener for Next/Play Again button
nextBtn.addEventListener("click", () => {
  if (nextBtn.classList.contains("playAgain")) {
    // If currently showing score (Play Again button is visible)
    startQuiz(); // Restart the quiz
  } else {
    // Otherwise, move to next question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(); // Show next question if available
    } else {
      showScore(); // Show final score if no more questions
    }
  }
});

// Start the quiz when the page loads
startQuiz();
