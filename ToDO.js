document.addEventListener("DOMContentLoaded", function() {
    const enterButton = document.getElementById("enter");
    const textArea = document.getElementById("TextTask");
    const outputDiv = document.querySelector(".Output");
    let editingTaskContainer = null; 
   
    
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }

   
    function saveTasks() {
        const tasks = [];
        outputDiv.querySelectorAll(".task-container").forEach(container => {
            const taskText = container.querySelector("p").textContent;
            const isChecked = container.querySelector("input[type='checkbox']").checked;
            tasks.push({ text: taskText, completed: isChecked });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function createTaskElement(taskTextContent, isCompleted = false) {
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task-container");

        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = isCompleted;
        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                taskText.style.textDecoration = "line-through";
            } else {
                taskText.style.textDecoration = "none";
            }
            saveTasks();
        });

        const taskText = document.createElement("p");
        taskText.textContent = taskTextContent;
        if (isCompleted) {
            taskText.style.textDecoration = "line-through";
        }

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function() {
            textArea.value = taskText.textContent;
            editingTaskContainer = taskContainer; 
        });


        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            outputDiv.removeChild(taskContainer);
            saveTasks(); 

            const nextSibling = taskContainer.nextElementSibling;
            if (nextSibling && nextSibling.tagName === "HR") {
                outputDiv.removeChild(nextSibling);
            }
        });

        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(taskText);
        taskContainer.appendChild(editButton);
        taskContainer.appendChild(deleteButton);
        outputDiv.appendChild(taskContainer);

        const lineElement = document.createElement("hr");
        outputDiv.appendChild(lineElement);
    }

    loadTasks();

    enterButton.addEventListener("click", function() {
        const task = textArea.value.trim();
        if (task) {
            if (editingTaskContainer) {
                const taskText = editingTaskContainer.querySelector("p");
                taskText.textContent = task;
                textArea.value = ""; 
                editingTaskContainer = null; 
                saveTasks(); 
            } else {
                
                createTaskElement(task);
                saveTasks(); 
                
                textArea.value = "";
            }
        }
    });
});
