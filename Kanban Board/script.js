const addBtn = document.querySelector(".add-btn");
const removeBtn = document.querySelector(".remove-btn");
const mainCont = document.querySelector(".main-cont");
const modalCont = document.querySelector(".modal-cont");
const textAreaCont = document.querySelector(".textArea-cont");

// State Flags

let addTaskFlag = false;
let removeTaskFlag = false;

//Event listners

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
function handleRemove(ticket){
  ticket.addEventListener("click",function(){
    if(removeTaskFlag){
      ticket.remove();
    }
  })
}


function createTicket(ticketColor,ticketID,ticketTask){

  const ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `
  <div class="ticket-color" style="background-color:${ticketColor}"></div>
        <div class="ticket-id">${ticketID}</div>
        <div class="task-area">${ticketTask}</div>
        <div class="ticket-lock">
          <i class="fa-solid fa-lock"></i>
        </div>
  `

  mainCont.appendChild(ticketCont);
  // console.log(ticketCont);

  handleRemove(ticketCont);

}

modalCont.addEventListener("keydown", function(e){
  const keypress = e.key;

  if(keypress === "Enter"){

    const ticketTask = textAreaCont.value.trim();
    if(ticketTask === ""){
      alert("Enter the task first")
      return; // why return bcz if not return then it will not passs an empty ticketTask
    }
    const ticketColor = byDefaultSeleColor;
    const ticketID = shortid.generate();
    
    createTicket(ticketColor,ticketID,ticketTask);

    modalCont.style.display = "none";
    
    addTaskFlag = false;

    textAreaCont.value = "";

  }
})


allPriorityColors = document.querySelectorAll(".priority-color");

const colors = ["lightpink","lightgreen","lightblue","black"];

let byDefaultSeleColor = colors[colors.length - 1];

// 1) grabs all the colors elem from html
    allPriorityColors.forEach(function(color){
  // 2) listen for a click on every individual
  color.addEventListener("click",function(){
    
  // 3) the moment we click on any color the active class gets wipe off
   allPriorityColors.forEach(function(selectedColor){
    selectedColor.classList.remove("active");

  });
   
   //attaching the active class to seleted colr
   color.classList.add("active");

   byDefaultSeleColor = color.classList[0];
  })

})

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