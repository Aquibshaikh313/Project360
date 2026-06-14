const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".create");

// Load notes from localStorage
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
}

// Save notes to localStorage
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

showNotes();

// Create a new note
createBtn.addEventListener("click", () => {
    const inputBox = document.createElement("p");
    const deleteIcon = document.createElement("img");

    inputBox.classList.add("input-box");
    inputBox.setAttribute("contenteditable", "true");

    deleteIcon.src = "./images/delete.png";
    deleteIcon.alt = "Delete Note";

    inputBox.appendChild(deleteIcon);
    notesContainer.appendChild(inputBox);

    updateStorage();
});

// Handle delete action
notesContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

// Save changes while typing
notesContainer.addEventListener("input", (e) => {
    if (e.target.classList.contains("input-box")) {
        updateStorage();
    }
});