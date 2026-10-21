
let tasks = [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const remaining = document.getElementById("remaining");
const message = document.getElementById("message");

// Add a new task
function addTask() {
    const taskName = taskInput.value.trim();

    if (taskName === "") {
        message.textContent = "Please enter a task.";
        taskInput.focus();
        return;
    }

    tasks.push({
        id: Date.now() + Math.random(),
        name: taskName,
        completed: false
    });

    taskInput.value = "";
    message.textContent = "";

    displayTasks();
}

// Add task when Enter key is pressed
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Filter tasks
function filterTasks(filter) {
    currentFilter = filter;

    document.querySelectorAll(".filter-btn").forEach(function(button) {
        button.classList.toggle(
            "active",
            button.dataset.filter === filter
        );
    });

    displayTasks();
}

// Mark a task as completed or active
function toggleTask(id) {
    const task = tasks.find(function(task) {
        return task.id === id;
    });

    if (task) {
        task.completed = !task.completed;
    }

    displayTasks();
}

// Delete one task
function deleteTask(id) {
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    displayTasks();
}

// Remove all completed tasks
function clearCompleted() {
    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    displayTasks();
}

// Display tasks
function displayTasks() {
    taskList.innerHTML = "";

    const remainingCount = tasks.filter(function(task) {
        return !task.completed;
    }).length;

    remaining.textContent = remainingCount + " remaining";

    const filteredTasks = tasks.filter(function(task) {
        if (currentFilter === "active") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    if (filteredTasks.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-message";

        if (currentFilter === "all" && tasks.length === 0) {
            emptyMessage.textContent =
                "No tasks yet. Add your first task!";
        } else if (currentFilter === "active") {
            emptyMessage.textContent = "No active tasks!";
        } else if (currentFilter === "completed") {
            emptyMessage.textContent = "No completed tasks!";
        } else {
            emptyMessage.textContent = "No tasks to display.";
        }

        taskList.appendChild(emptyMessage);
        return;
    }

    filteredTasks.forEach(function(task) {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        if (task.completed) {
            taskItem.classList.add("done");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            toggleTask(task.id);
        });

        const taskName = document.createElement("span");
        taskName.className = "task-name";
        taskName.textContent = task.name;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskName);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

// Initial display
displayTasks();
