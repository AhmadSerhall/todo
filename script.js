const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.querySelector('.task-list');
const noTasksContainer = document.createElement('div'); // Container for "No tasks to do" message

addTaskButton.addEventListener('click', function () {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.setAttribute('draggable', 'true');
        taskItem.textContent = taskText;

        taskList.appendChild(taskItem);

        taskInput.value = '';

        // Hide "No tasks to do" message if tasks are added
        noTasksContainer.style.display = 'none';
    } else {
        alert('Please enter a task.'); // You can replace this with a more user-friendly notification
    }

    updateNoTasksMessage(); // Check if there are tasks after adding
});

taskInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        addTaskButton.click();
    }
});

let dragSrcElement = null;

taskList.addEventListener('dragstart', function (e) {
    dragSrcElement = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
});

taskList.addEventListener('dragover', function (e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    return false;
});

taskList.addEventListener('drop', function (e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (dragSrcElement !== e.target) {
        dragSrcElement.innerHTML = e.target.innerHTML;
        e.target.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
});

// Function to update "No tasks to do" message
function updateNoTasksMessage() {
    if (taskList.children.length === 0) {
        noTasksContainer.textContent = 'No tasks to do';
        noTasksContainer.classList.add('no-tasks-message');
        taskList.appendChild(noTasksContainer);
    } else {
        noTasksContainer.style.display = 'none';
    }
}

// Initial check for tasks when the page loads
updateNoTasksMessage();

// Add this to your existing JavaScript file
function searchTasks() {
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    const taskItems = document.querySelectorAll('.task-item');

    taskItems.forEach(function (taskItem) {
        const taskText = taskItem.textContent.toLowerCase();
        const indexOfMatch = taskText.indexOf(searchInput);

        if (indexOfMatch !== -1) {
            const highlightedText = taskText.substring(0, indexOfMatch) +
                '<span class="highlight">' + taskText.substring(indexOfMatch, indexOfMatch + searchInput.length) + '</span>' +
                taskText.substring(indexOfMatch + searchInput.length);

            taskItem.innerHTML = highlightedText;
        } else {
            taskItem.innerHTML = taskText;
        }
    });
}

// Optional: Clear search input and remove highlighting when the input is cleared
document.getElementById('search-input').addEventListener('input', function () {
    if (this.value.trim() === '') {
        const taskItems = document.querySelectorAll('.task-item');
        taskItems.forEach(function (taskItem) {
            taskItem.innerHTML = taskItem.textContent;
        });
    }
});

