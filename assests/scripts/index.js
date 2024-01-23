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
        createGoalBtn.classList.remove('active')
    });

    createGoalBtn.addEventListener('click', function () {
        // Show Create Goal section, hide Create Task section
        goalSection.classList.remove('hidden');
        taskSection.classList.add('hidden');
        createTaskBtn.classList.remove('active')
        createGoalBtn.classList.add('active')

    });
});
