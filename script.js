
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.querySelector('.task-list');

addTaskButton.addEventListener('click', function () {
    const taskText = taskInput.value.trim(); 

    if (taskText !== '') {
        
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.textContent = taskText;

        
        taskList.appendChild(taskItem);

        
        taskInput.value = '';
    }
});

// Allow adding tasks by pressing Enter key
taskInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        addTaskButton.click(); // 
    }
});
