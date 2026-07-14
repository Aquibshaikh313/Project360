const divBlock = document.getElementsByClassName("quiz");
const question = document.getElementById("question");
const ans = document.getElementById("answer-buttons");
const nextBtn = document.querySelector("#next-btn");
const questNum = document.querySelector("#ques-num");
const selectedbtn = document.querySelectorAll(".btn");
const resCard = document.querySelector("#result-card");
const finScore = document.querySelector("#final-score");
const resBtn = document.querySelector("#restart-btn");

let questions = [];
let currentQuestion = 0;
let rightAns = 0;
let hasAnswered = false;


//*******Function to display the questions******
function showQuestion() {
  question.innerText = `${currentQuestion + 1} : ${questions[currentQuestion].question}`;
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button, index) => {
    button.innerText = questions[currentQuestion].options[index];
    // console.log(questions[currentQuestion].answer); this way we can get correct ans
  });
}

fetch("./questions.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    questions = data; 
    // We store data inside the global questions variable so that other user-driven actions (like clicking the Next Button later) can read the quiz data. We call showQuestion() inside this block because we have to wait for the data to finish downloading before we can display it.

    showQuestion();
  });

// switching to next question
nextBtn.addEventListener("click", function () {
  // console.log(nextBtn);
  // console.log(currentQuestion);
  // console.log(currentQuestion < questions.length - 1);
  // console.log(hasAnswered);
  // console.log(questions.length);

  if (currentQuestion < questions.length - 1 && hasAnswered) {
    currentQuestion++;
    hasAnswered = false; //resetting this false for the next question
    showQuestion();

    //Eraser is needed or else it will take the values(selection) from prev question
    selectedbtn.forEach(function (btn) {
      btn.style.backgroundColor = "";
    });

  } else if (!hasAnswered) {
    alert("Select the option below");
  } else {
    //making our score card visibel at the end
    if (currentQuestion == questions.length - 1) {
      resCard.style.display = "flex";
      finScore.innerText = rightAns;
    }
  }
});

//after clicking on restart btn on score lets take it to back to first question
resBtn.addEventListener("click", function () {
  currentQuestion = 0;
  rightAns = 0;
  hasAnswered = false;
  resCard.style.display = "none";
  showQuestion();
});


selectedbtn.forEach(function (btn, index) {
  btn.addEventListener("click", function () {
    hasAnswered = true; // tell the next btn that the answer was picked/selected
    
    //we need to run this below loop to erase the memory after selection or else it will remain as it is
    selectedbtn.forEach(function (everyBtn) {
      everyBtn.style.backgroundColor = "";
    });

    const correctAns = questions[currentQuestion].answer;

    if (btn.innerText == correctAns) {
      btn.style.backgroundColor = "green";
      rightAns++;
      console.log("Correct Ans :", rightAns);

      // btn.style.backgroundColor = "";
    } else {
      btn.style.backgroundColor = "red";
    }
  });
});

/**
 * Todays task for project
 * 1) showcase correct ans if selected - green ,if wrong - red (done)
 * 2) Disable every button after clicking ,No changing ans (done little tricky but done)
 * 3) Maintaining a score counter at last when quiz gets over
 *
 */
