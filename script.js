document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector(".add-btn");
    const form = document.querySelector("form");
    const input = form.querySelector("input");

    addBtn.addEventListener("click", () => {
        form.style.display = "block";
        input.focus();
    });

const taskList = document.querySelector ("ul");

form.addEventListener("submit", (e) => {
    e.preventDefault(); //stop page reload
    const taskText = input.value.trim();

    if (taskText === "") return; //do nothing if empty

    //create new list item
    const li = document.createElement("li");

    //add checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    //add task text
    const span = document.createElement("span");
    span.textContent = taskText;

    //add edit button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.type = "button";
    editBtn.textContent = "✎";

    //add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.type = "button";
    deleteBtn.textContent = "🗑️";

    //add everything to the list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    //delete functionality
    deleteBtn.addEventListener("click", () => {
        li.style.transition = "opacity 0.5s";
        li.style.opacity = "0";
        setTimeout(() => {
            li.remove();
        }, 500);
    });

    //edit functionality
    editBtn.addEventListener("click", () => {
        const inputEdit = document.createElement("input");
        inputEdit.type = "text";
        inputEdit.value = span.textContent;
        inputEdit.className = "task-input";

        //replace span with input
        li.replaceChild(inputEdit, span);
        inputEdit.focus();

        //Save on enter or blur
        const saveEdit = () => {
            if (inputEdit.value.trim() !== "") {
                span.textContent = inputEdit.value.trim();
            }
            li.replaceChild(span, inputEdit);
        };
        
        inputEdit.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                saveEdit();
            }
        });
        inputEdit.addEventListener("blur", saveEdit);
    });

    //add the list item to the list
    taskList.appendChild(li);

    //clear input and hide form
    input.value = "";
    form.style.display = "none";

    //checkbok functionality
    checkbox.addEventListener("change", () => {
        span.classList.toggle("completed", checkbox.checked);
    });

});

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
});

});


