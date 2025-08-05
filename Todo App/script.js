
    const inputText = document.querySelector("#inputText");
    const addTask = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    addTask.addEventListener("click", () => {
      const inputValue = inputText.value.trim();
      if (inputValue !== "") {
        const li = document.createElement("li"); // ✅ Create a new <li>
        
        const span = document.createElement('span'); // ✅ To hold text separately
        span.textContent = inputValue;

        //creat a delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.style.marginLeft = "10px";

        //adding click event to delete the task
        deleteBtn.addEventListener("click", () => {
          li.remove();
        });

        //create a edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        deleteBtn.style.marginLeft = "10px";

        //adding click event to edit button
        editBtn.addEventListener("click", () => {
          if(editBtn.textContent === "✏️"){
            span.contentEditable = 'true';
            span.focus();
            editBtn.textContent = 'save'
            editBtn.style.marginLeft = "10px";
        } else {
            // Save Edited Task
            span.contentEditable = "false";
            editBtn.textContent = "✏️";
          }
        });

        li.appendChild(span); // ✅ Add the task text
        li.appendChild(editBtn); // ✅ Add Edit button

        //adding delete button to task list
        li.appendChild(deleteBtn);

        // //adding delete listitem to task list
        taskList.appendChild(li);

        inputText.value = "";
      }
    });
  