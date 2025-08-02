// ===== JavaScript Section =====

// Function to generate a random hex color
const randomColor = function () {
  const hex = "0123456ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return color;
};

let intervalId;

// Function to start changing background color every second
const startChangingColor = function () {
  if (!intervalId) {
    intervalId = setInterval(changeBgColor, 1000);
  }

  function changeBgColor() {
    document.body.style.backgroundColor = randomColor();
  }
};

// Function to stop changing background color
const stopChangingColor = function () {
  clearInterval(intervalId);
  intervalId = null;
};

// Add event listeners to buttons
document.getElementById("start").addEventListener("click", startChangingColor);
document.getElementById("stop").addEventListener("click", stopChangingColor);
