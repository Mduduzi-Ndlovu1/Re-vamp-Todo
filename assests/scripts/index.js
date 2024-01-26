document.addEventListener('DOMContentLoaded', function () {
    // Get references to the buttons and sections
    const createTaskBtn = document.getElementById('createTaskBtn');
    const createGoalBtn = document.getElementById('createGoalBtn');
    const taskSection = document.getElementById('task-section');
    const goalSection = document.getElementById('goal-section');

    // Add click event listeners to the buttons
    createTaskBtn.addEventListener('click', function () {
        // Show Create Task section, hide Create Goal section
        taskSection.classList.remove('hidden');
        goalSection.classList.add('hidden');
        createTaskBtn.classList.add('active');
        createGoalBtn.classList.remove('active');
    });

    createGoalBtn.addEventListener('click', function () {
        // Show Create Goal section, hide Create Task section
        goalSection.classList.remove('hidden');
        taskSection.classList.add('hidden');
        createTaskBtn.classList.remove('active');
        createGoalBtn.classList.add('active');
    });

    // Load tasks and goals from localStorage
    loadTasks();
    loadGoals();
});

document.getElementById("task-form").addEventListener("submit", function(e) {
    e.preventDefault();

    var task_name = document.getElementById("task-name").value;
    var task_desc = document.getElementById("task-desc").value;

    // Save the task to localStorage
    saveTask({ name: task_name, desc: task_desc });

    // Load tasks from localStorage
    loadTasks();
});

document.getElementById("goal-form").addEventListener("submit", function(e) {
    e.preventDefault();

    var goal_name = document.getElementById("goal-name").value;
    var goal_desc = document.getElementById("goal-desc").value;
    var goal_date = document.getElementById("Goal-date").value;

    // Save the goal to localStorage
    saveGoal({ name: goal_name, desc: goal_desc, date: goal_date });

    // Load goals from localStorage
    loadGoals();
});

function saveTask(task) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var taskListElement = document.getElementById("task-list");
    taskListElement.innerHTML = "";

    tasks.forEach(function (task, index) {
        var newTaskElement = createTaskElement(task.name, task.desc, index);
        taskListElement.appendChild(newTaskElement);
    });
}

function createTaskElement(name, desc, index) {
    var newTaskElement = document.createElement("div");
    newTaskElement.className = "task-list container  my-3";
    newTaskElement.innerHTML = `
        <h2 id="task-${index}">
            ${name}
        </h2>
        <div class="button-container">
            <button class="button-done" onclick="markAsDone(${index})">
                <i class="bi bi-check-circle-fill"></i>
            </button>
            <button class="button-delete" onclick="deleteTask(${index})">
                <i class="bi bi-trash3"></i>
            </button>
        </div>
        <div class="task-desc">
            <br>
            ${desc}
        </div>
    `;
    return newTaskElement;
}

function markAsDone(index) {
    // Mark the task as done by updating its styling
    var taskElement = document.getElementById(`task-${index}`);
    taskElement.style.textDecoration = "line-through";
    taskElement.parentElement.style.backgroundColor = "lightgreen";
}

function deleteTask(index) {
    // Delete the task from localStorage and reload the tasks
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function saveGoal(goal) {
    var goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.push(goal);
    localStorage.setItem("goals", JSON.stringify(goals));
}

function loadGoals() {
    var goals = JSON.parse(localStorage.getItem("goals")) || [];
    var goalListElement = document.getElementById("Goal-list");
    goalListElement.innerHTML = "";

    goals.forEach(function (goal, index) {
        var newGoalElement = createGoalElement(goal.name, goal.desc, goal.date, index);
        goalListElement.appendChild(newGoalElement);
    });
}

function createGoalElement(name, desc, date, index) {
    var newGoalElement = document.createElement("div");
    newGoalElement.className = "task-list container  my-3";
    newGoalElement.innerHTML = `
        <h2 id="goal-${index}">
            <strong>${name}</strong>
        </h2>
        <div class="button-container">
            <button class="button-done" onclick="markAsDoneGoal(${index})">
                <i class="bi bi-check-circle-fill"></i>
            </button>
            <button class="button-delete" onclick="deleteGoal(${index})">
                <i class="bi bi-trash3"></i>
            </button>
        </div>
        <div class="task-desc">
            ${desc}
        </div>
        <div class="date-container">
            ${date}
        </div>
    `;
    return newGoalElement;
}

function markAsDoneGoal(index) {
    // Mark the goal as done by updating its styling
    var goalElement = document.getElementById(`goal-${index}`);
    goalElement.style.textDecoration = "line-through";
    goalElement.parentElement.style.backgroundColor = "lightgreen";
}

function deleteGoal(index) {
    // Delete the goal from localStorage and reload the goals
    var goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.splice(index, 1);
    localStorage.setItem("goals", JSON.stringify(goals));
    loadGoals();
}
