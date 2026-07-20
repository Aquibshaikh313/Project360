const divBlock = document.getElementsByClassName("quiz");
const question = document.getElementById("question");
const ans = document.getElementById("answer-buttons");
const nextBtn = document.querySelector("#next-btn");
const questNum = document.querySelector("#ques-num");
const selectedbtn = document.querySelectorAll(".btn");
const resCard = document.querySelector("#result-card");
const finScore = document.querySelector("#final-score");
const resBtn = document.querySelector("#restart-btn");
const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");
const quizBox = document.querySelector(".app");
const accuracyText = document.querySelector(".accuracy");

let questions = [];
let currentQuestion = 0;
let rightAns = 0;
let hasAnswered = false;

//*******Function to display the questions******
function showQuestion() {
  question.innerText = `${currentQuestion + 1} : ${questions[currentQuestion].question}`;

  selectedbtn.forEach((button, index) => {
    button.innerText = questions[currentQuestion].options[index];
    // console.log(questions[currentQuestion].answer); this way we can get correct ans
  });
}

fetch("./questions.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network Error was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    questions = data;
    // We store data inside the global questions variable so that other user-driven actions (like clicking the Next Button later) can read the quiz data. We call showQuestion() inside this block because we have to wait for the data to finish downloading before we can display it.

    showQuestion();
    updateProgress();
  })
  .catch((error) => {
    console.error("fetch error", error);
  });

// switching to next question
nextBtn.addEventListener("click", function () {
  if (currentQuestion < questions.length - 1 && hasAnswered) {
    currentQuestion++;
    hasAnswered = false; //resetting this false for the next question
    showQuestion();
    updateProgress();

    //Eraser is needed or else it will take the values(selection) from prev question
    selectedbtn.forEach(function (everyBtn) {
      everyBtn.style.backgroundColor = "";
      everyBtn.disabled = false;
    });
  } else if (!hasAnswered) {
    alert("Select the option below");
  } else {
    //making our score card visibel at the end
    if (currentQuestion === questions.length - 1) {
      resCard.style.display = "flex";
      quizBox.style.display = "none";
      finScore.innerText = rightAns;

      //accuracy logic
      const accuracy = Math.round((rightAns / questions.length) * 100);
      accuracyText.innerText = `Accuracy : ${accuracy} %`;
    }
  }
});

//after clicking on restart btn on score lets take it to back to first question
resBtn.addEventListener("click", function () {
  currentQuestion = 0;
  rightAns = 0;
  hasAnswered = false;
  resCard.style.display = "none";
  quizBox.style.display = "block";
  selectedbtn.forEach(function (btn) {
    btn.style.backgroundColor = "";
  });
  showQuestion();
  updateProgress();
});

selectedbtn.forEach(function (btn, index) {
  btn.addEventListener("click", function () {
    hasAnswered = true; // tell the next btn that the answer was picked/selected

    const correctAns = questions[currentQuestion].answer;

    //updating the score first before looping thru it
    if (btn.innerText === correctAns) {
      rightAns++;
      console.log("Correct Ans", rightAns);
    }

    selectedbtn.forEach(function (everyBtn) {
      if (everyBtn.innerText === correctAns) {
        everyBtn.style.backgroundColor = "green";
      } else if (everyBtn === btn) {
        everyBtn.style.backgroundColor = "red";
      }

      everyBtn.disabled = true;
    });
  });
});

function updateProgress() {
  if (questions.length === 0) return;

  // Calculate percentage based on total questions
  const percentage = ((currentQuestion + 1) / questions.length) * 100;

  // Update the CSS width property
  progressBar.style.width = `${percentage}%`;

  // Optional: Update text inside or alongside the progress bar if progressText exists
  if (progressText) {
    progressText.innerText = `Question ${currentQuestion + 1} of ${questions.length}`;
  }
}
