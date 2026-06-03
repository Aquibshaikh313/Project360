// Selectors
const addBtn = document.querySelector(".add-btn");
const removeBtn = document.querySelector(".remove-btn");
const mainCont = document.querySelector(".main-cont");
const modalCont = document.querySelector(".modal-cont");
const textAreaCont = document.querySelector(".textArea-cont");
const colors = ["lightpink", "lightgreen", "lightblue", "black"];

const lockClose = "fa-lock";
const lockOpen = "fa-lock-open";

// State Flags

let addTaskFlag = false;
let removeTaskFlag = false;

//Event listners

// 1) adding
addBtn.addEventListener("click", function () {
  //flip the flag value

  addTaskFlag = !addTaskFlag;

  // if(addTaskFlag){
  //   modalCont.style.display = "flex";
  //   addBtn.style.color = "red"
  // }else{
  //   modalCont.style.display = "none";
  //   addBtn.style.color = "white";
  // }

  modalCont.style.display = addTaskFlag ? "flex" : "none";
});

// 2) removing
removeBtn.addEventListener("click", function () {
  //flip the flag value
  removeTaskFlag = !removeTaskFlag;

  if (removeTaskFlag) {
    modalCont.style.display = "none";
    removeBtn.style.color = "red";
  } else {
    removeBtn.style.color = "white";
  }
});

// Creating funtion to remove the newly created ticket
function handleRemove(ticket) {
  ticket.addEventListener("click", function () {
    if (removeTaskFlag) {
      ticket.remove();
    }
  });
}

//Creating function to handleLock
function handleLock(ticket) {
  const ticketLockElem = ticket.querySelector(".ticket-lock"); // this is local scope so ticket.query selector
  const ticketIconElem = ticketLockElem.children[0];
  const textAreaCont = ticket.querySelector(".task-area");

  ticketIconElem.addEventListener("click", function (e) {
    e.stopPropagation();

    if (ticketIconElem.classList.contains(lockClose)) {
      ticketIconElem.classList.remove(lockClose);
      ticketIconElem.classList.add(lockOpen);
      //make the task editable
      textAreaCont.setAttribute("contenteditable", "true");
    } else {
      ticketIconElem.classList.remove(lockOpen);
      ticketIconElem.classList.add(lockClose);
      //make it non editable
      textAreaCont.setAttribute("contenteditable", false);
    }

    // console.log(ticketIconElem);
  });
}

//Changing color using toolbox color on navbar

function handleColor(ticket) {
  // Identify the color band that was clicked
  // Find the color index in the array
  // move the next color index (cyclically)
  //update the bg color

  const ticketColorBand = ticket.querySelector(".ticket-color");
  ticketColorBand.addEventListener("click", function () {
    // 1. find the current color
    let currentColor = ticketColorBand.style.backgroundColor;

    // 2: now finding the index of color in the array

    let currentColorIdx = colors.findIndex(function (color) {
      return currentColor === color;
    });

    // 3 moving cyclically
    let newColorIdx = (currentColorIdx + 1) % colors.length;
    let newColor = colors[newColorIdx];

    // 4 updating the color band:
    ticketColorBand.style.backgroundColor = newColor;

    console.log(currentColor, currentColorIdx, newColorIdx, newColor);

    // **********achieving the same thing usin loops*******************
    // let currentColorIdx = -1;

    // for(let i = 0 ; i < colors.length; i++){
    //  if(colors[i] === currentColor){
    //   currentColorIdx = i;
    //   break;
    //  }
    // }
    // console.log(currentColorIdx)
  });
}

// Function to Create a new ticket : color,id,task
function createTicket(ticketColor, ticketID, ticketTask) {
  const ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `
  <div class="ticket-color" style="background-color:${ticketColor}"></div>
        <div class="ticket-id">${ticketID}</div>
        <div class="task-area">${ticketTask}</div>
        <div class="ticket-lock" >
          <i class="fa-solid fa-lock"></i>
        </div>
  `;

  mainCont.appendChild(ticketCont);
  // console.log(ticketCont);

  handleRemove(ticketCont);
  handleLock(ticketCont);
  handleColor(ticketCont);
}

//practise something

// const ticketArray = [];

//modal

modalCont.addEventListener("keydown", function (e) {
  const keypress = e.key;

  if (keypress === "Enter") {
    const ticketTask = textAreaCont.value.trim();
    if (ticketTask === "") {
      alert("Enter the task first");
      return; // why return bcz if not return then it will not passs an empty ticketTask
    }
    // console.log(ticketTask);
    const ticketColor = byDefaultSeleColor;
    const ticketID = shortid.generate();

    createTicket(ticketColor, ticketID, ticketTask);

    // ticketArray.push({ticketColor,ticketID,ticketTask});
    // console.log(ticketArray);

    modalCont.style.display = "none";

    addTaskFlag = false;

    textAreaCont.value = "";
  }
});

// changing colors based on selection

const allPriorityColors = document.querySelectorAll(".priority-color");

// const colors = ["lightpink","lightgreen","lightblue","black"];

let byDefaultSeleColor = colors[colors.length - 1];

// 1) grabs all the colors elem from html
allPriorityColors.forEach(function (color) {
  // 2) listen for a click on every individual
  color.addEventListener("click", function () {
    // 3) the moment we click on any color the active class gets wipe off
    allPriorityColors.forEach(function (selectedColor) {
      selectedColor.classList.remove("active");
    });

    //attaching the active class to seleted colr
    color.classList.add("active");

    byDefaultSeleColor = color.classList[0];
  });
});

// alternate way to do the above thing
// allPriorityColors.forEach(function(color) {
//   color.addEventListener("click", function() {

//     // Find the SINGLE element that currently has 'active' and remove it
//     const currentActive = document.querySelector(".priority-color.active");
//     if (currentActive) {
//       currentActive.classList.remove("active");
//     }

//     // Add 'active' to the newly clicked element
//     color.classList.add("active");
//   });
// });

const toolBoxColors = document.getElementsByClassName("color");

//1 looping through all colors
for (let i = 0; i < toolBoxColors.length; i++) {
  toolBoxColors[i].addEventListener("click", function () {
    console.log(toolBoxColors);
    //selecting color
    let selectedColor = toolBoxColors[i].classList[0];
    // console.log(selectedColor);

    //2 select all tickets
    let allTickets = document.querySelectorAll(".ticket-cont");
    console.log  (allTickets);

    //3 looping through ticketColorBand
    for (let j = 0; j < allTickets.length; j++) {
      console.log(j);
      
      //finding the color band
      let ticketColor =
        allTickets[j].querySelector(".ticket-color").style.backgroundColor;
      console.log(ticketColor);

      //4 comparing colors
      if (ticketColor === selectedColor) {
        allTickets[j].style.display = "block";
      } else {
        allTickets[j].style.display = "none";
      }
    }
  });

  // step 5 : adding dbl click event
  toolBoxColors[i].addEventListener("dblclick", function () {
    let allTickets = document.querySelectorAll(".ticket-cont");
    for (let k = 0; k < allTickets.length; k++) {
      allTickets[k].style.display = "block";
    }
  });
}
