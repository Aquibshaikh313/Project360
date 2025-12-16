const notesCont = document.querySelector(".notes-container");
const createBtn = document.querySelector(".create");
let notes = document.querySelector(".input-box");

function showNotes(){
  notesCont.innerHTML = localStorage.getItem("notes")
}
showNotes();

//after refershing data is loss so need to add local storage
function updateStorage(){
  localStorage.setItem("notes",notesCont.innerHTML);
}


createBtn.addEventListener("click",() => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "./images/delete.png";
  notesCont.appendChild(inputBox).appendChild(img);
})

notesCont.addEventListener("click", function(e){
  if(e.target.tagName === "IMG"){
    e.target.parentElement.remove();
    updateStorage();
  }
  else if(e.target.tagName === "P"){
    notes = document.querySelectorAll(".input-box");
    notes.forEach(nt => {
      nt.onkeyup = function(){
        updateStorage();
      }
      
    });
  }
})