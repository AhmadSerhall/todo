const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.querySelector('.task-list');
const searchInput = document.getElementById('search-input');

function createIcon(iconClass) {
    const icon = document.createElement('i');
    icon.classList.add('fas', iconClass, 'icon');
    icon.style.cursor = 'pointer';
    return icon;
}

function addTask(taskText) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.setAttribute('draggable', 'true');

    const taskTextContainer = document.createElement('span');
    taskTextContainer.classList.add('task-text');
    taskTextContainer.textContent = taskText;

    const editIcon = createIcon('fa-pen');
    editIcon.addEventListener('click', function () {
        const newText = prompt('Edit the task:', taskTextContainer.textContent);
        if (newText !== null) {
            taskTextContainer.textContent = newText;
            saveTasksToLocalStorage();
        }
    });

    const space = document.createTextNode(' ');

    const deleteIcon = createIcon('fa-trash-alt');
    deleteIcon.addEventListener('click', function () {
        taskItem.remove();
        saveTasksToLocalStorage();
        updateNoTasksMessage();
    });

    const completedIcon = createIcon('fa-check-circle');
    completedIcon.addEventListener('click', function () {
        if (taskTextContainer.style.textDecoration === 'line-through') {
            taskTextContainer.style.textDecoration = 'none';
        } else {
            taskTextContainer.style.textDecoration = 'line-through';
        }
    });

    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add('icons-container');
    iconsContainer.style.display = 'flex';
    iconsContainer.appendChild(deleteIcon);
    iconsContainer.appendChild(space);
    iconsContainer.appendChild(editIcon);
    iconsContainer.appendChild(space);
    iconsContainer.appendChild(completedIcon);

    taskItem.appendChild(taskTextContainer);
    taskItem.appendChild(iconsContainer);

    taskList.appendChild(taskItem);
    updateNoTasksMessage();
}

addTaskButton.addEventListener('click', function () {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTask(taskText);
        saveTasksToLocalStorage();
        taskInput.value = '';
    } else {
        alert('Please enter a task.');
    }
});

// Function to update "No tasks to do" message
function updateNoTasksMessage() {
    const noTasksMessage = document.querySelector('.no-tasks-message');

    if (taskList.children.length === 0) {
        if (!noTasksMessage) {
            const newNoTasksContainer = document.createElement('div');
            newNoTasksContainer.textContent = 'No tasks to do';
            newNoTasksContainer.classList.add('no-tasks-message');
            taskList.appendChild(newNoTasksContainer);
        }
    } else {
        if (noTasksMessage) {
            noTasksMessage.style.display = 'none';
        }
    }
}

updateNoTasksMessage();

//search task
function searchTasks() {
    const searchInputValue = searchInput.value.trim().toLowerCase();
    const taskItems = document.querySelectorAll('.task-item');

    taskItems.forEach(function (taskItem) {
        const taskTextContainer = taskItem.querySelector('.task-text');
        const taskText = taskTextContainer.textContent.toLowerCase();
        const indexOfMatch = taskText.indexOf(searchInputValue);

        taskTextContainer.innerHTML = taskText; // Revert the text

        if (indexOfMatch !== -1) {
            const newText = taskText.substring(0, indexOfMatch) +
                '<span class="highlight">' + taskText.substring(indexOfMatch, indexOfMatch + searchInputValue.length) + '</span>' +
                taskText.substring(indexOfMatch + searchInputValue.length);
            taskTextContainer.innerHTML = newText; // Update text with highlighting
        }
    });
}

searchInput.addEventListener('input', searchTasks);

// Function to save tasks to localStorage
function saveTasksToLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll('.task-item').forEach(taskItem => {
        tasks.push(taskItem.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(taskText => addTask(taskText));
    }
}
// Call loadTasksFromLocalStorage to load saved tasks on page load
loadTasksFromLocalStorage();
