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


function createTicket(){

  const ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `
  <div class="ticket-color"></div>
        <div class="ticket-id">1234</div>
        <div class="task-area">Random Task</div>
        <div class="ticket-lock">
          <i class="fa-solid fa-lock"></i>
        </div>
  `

  mainCont.appendChild(ticketCont);
  // console.log(ticketCont);

}

modalCont.addEventListener("keydown", function(e){
  const keypress = e.key;

  if(keypress === "Enter"){
    createTicket();

    modalCont.style.display = "none";
    
    addTaskFlag = false;

    textAreaCont.value = "";

  }
})