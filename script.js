let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector(".add-btn");
    const form = document.querySelector("form");
    const input = form.querySelector("input");

    addBtn.addEventListener("click", () => {
        form.style.display = "block";
        input.focus();
    });

const taskList = document.querySelector ("ul");

//Load from localStorage
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks = savedTasks;
tasks.forEach(task => renderTask(task));

function renderTask (taskObj) {
    console.log("rendering", taskObj);
    //Create the list item element
    const li = document.createElement("li")

    //Create the checkbox input
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = taskObj.completed // mark as checked if completed before

    //create the span to display the task text
    const span = document.createElement("span");
    span.textContent = taskObj.text;

    //if task mark completed
    if (taskObj.completed) {
        span.classList.add("completed");
    }

    //create edit button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.type = "button";
    editBtn.textContent = "✎";

    //create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.type = "button";
    deleteBtn.textContent = "🗑️";

    //add all elements to the list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    //add the list item to the task list in the DOM
    taskList.appendChild(li)

    //delete functionality
    deleteBtn.addEventListener("click", () => {
        li.style.transition = "opacity 0.5s";
        li.style.opacity = "0";
        setTimeout(() => {
            li.remove();
        }, 500);

        //remove from rasks array and update localstorage
        tasks = tasks.filter(t => t.id !== taskObj.id);
        localStorage.setItem("tasks", JSON.stringify(tasks))
    });

    // Edit button fucntionality
    editBtn.addEventListener("click", () => {
        // Create an input box pre-filled with the task text
        const inputEdit = document.createElement("input");
        inputEdit.type = "text";
        inputEdit.value = span.textContent;
        inputEdit.className = "task-input";

        // Replace the text span with the input field
        li.replaceChild(inputEdit, span);
        inputEdit.focus();

        // Save changes when Enter key pressed
        const saveEdit = () => {
            const newText = inputEdit.value.trim();
            if (newText !== "") {
                span.textContent = newText;
                taskObj.text = newText; 
                localStorage.setItem("tasks", JSON.stringify(tasks)); // save update
            }
            li.replaceChild(span, inputEdit); // replace input with updated text
        };

        inputEdit.addEventListener("keydown", (e) => {
            if (e.key === "Enter") saveEdit();
        });
        inputEdit.addEventListener("blur", saveEdit);
    });

    // Handle checkbox toggle: strike through and update completed status
        checkbox.addEventListener("change", () => {
        span.classList.toggle("completed", checkbox.checked);
        taskObj.completed = checkbox.checked; // update object
        localStorage.setItem("tasks", JSON.stringify(tasks)); // save change
    });
};

form.addEventListener("submit", (e) => {
    e.preventDefault(); //stop page reload
    const taskText = input.value.trim();

    if (taskText === "") return; //do nothing if empty

    
    //Create task object 
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    //Save to array and localStorage
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTask(newTask);

    input.value = "";
    form.style.display = "none"
    input.blur();

});

//Clear functionality
const clearBtn = document.querySelector(".clear-btn");

clearBtn.addEventListener("click", () => {
    const allTasks = document.querySelectorAll("ul li");
    
    allTasks.forEach((li, index) => {
        li.classList.add("fade-out");
        li.style.transition = "opacity 0.5s";
        li.style.opacity = "0";
        setTimeout(() => {
            li.remove();
        }, 500 + index * 100);
    })
    //Clear memory and localStorage
    tasks = [];
    localStorage.removeItem("tasks");
});

// Reset functionality
const resetBtn = document.querySelector(".reset-btn");

resetBtn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll("ul li input[type='checkbox']");
    const spans = document.querySelectorAll("ul li span");

    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = false;
        spans[index].classList.remove("completed");
        if (tasks[index]) {
            tasks[index].completed = false;
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
});

});


