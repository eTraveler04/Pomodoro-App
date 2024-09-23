function Task(name, duration) {
  this.name = name;
  this.duration = duration;
}

let tasks = [];

function displayTasks(tasks) {
  const taskContainer = document.getElementById('taskContainer');
  taskContainer.innerHTML = ''; // Clear existing content

  tasks.forEach((task) => {
    // Create a new div for each task
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    // Add the task title
    let taskTitle = document.createElement('h3');
    taskTitle.innerText = task.title;
    taskDiv.appendChild(taskTitle);

    // Add the task description
    let taskDescription = document.createElement('p');
    taskDescription.innerText = task.description;
    taskDiv.appendChild(taskDescription);

    // Append the task div to the container
    taskContainer.appendChild(taskDiv);
  });
}

// Otwórz modal TASKS
document
  .getElementById('openTasksModalBtn')
  .addEventListener('click', function () {
    document.getElementById('tasksModal').style.display = 'flex';
  });

// Zamknij modal
document
  .getElementById('closeTasksModalBtn')
  .addEventListener('click', function () {
    document.getElementById('tasksModal').style.display = 'none';
  });

// Zamknij modal, gdy klikniesz poza nim
window.onclick = function (event) {
  const modal = document.getElementById('tasksModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

function cancelTaskBtn() {
  showForm();
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDuration').value = 1;
  document.getElementById('taskDuration1').value = 25;
}

// Function to handle adding a new task
function addTask() {
  const taskTitle = document.getElementById('taskTitle').value;
  const taskDuration = document.getElementById('taskDuration').value;

  if (taskTitle !== '' && taskDuration !== null) {
    let task = new Task(taskTitle, taskDuration);
    tasks.push(task); // Add the new task to the task array
    console.log('jestem tu');

    // Clear the input fields after adding the task
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDuration').value = 0;

    // Hide the form again after adding the task
    showForm();
  } else {
    alert('Please fill out both the title and description!');
  }
}

// Function to show the task form
function showForm() {
  const addTaskBtn = document.getElementById('showFormButton');
  const taskForm = document.getElementById('taskForm');
  if (taskForm.style.display === 'none') {
    taskForm.style.display = 'block'; // Show the form
    addTaskBtn.style.display = 'none';
  } else {
    taskForm.style.display = 'none'; // Hide the form
    addTaskBtn.style.display = 'block';
  }
}

// Set event handlers
// document.getElementById('createTaskBtn').onclick = addTask;

// Display initial tasks
displayTasks(tasks);

// Przyciski input task duration

// Obsługa zwiększania wartości

inputValueIncrease('taskDurationIncreaseBtn', 'taskDuration');
inputValueDecrease('taskDurationDecreaseBtn', 'taskDuration');
inputValueIncrease('taskDurationIncreaseBtn1', 'taskDuration1');
inputValueDecrease('taskDurationDecreaseBtn1', 'taskDuration1');

function inputValueIncrease(buttonID, inputID) {
  document.getElementById(buttonID).addEventListener('click', function () {
    const inputField = document.getElementById(inputID);
    let currentValue = parseInt(inputField.value) || 0; // Pobierz bieżącą wartość (domyślnie 0)
    inputField.value = currentValue + 1; // Zwiększ wartość o 1
  });
}

function inputValueDecrease(buttonID, inputID) {
  // Obsługa zmniejszania wartości
  document.getElementById(buttonID).addEventListener('click', function () {
    const inputField = document.getElementById(inputID);
    let currentValue = parseInt(inputField.value) || 0; // Pobierz bieżącą wartość (domyślnie 0)
    if (currentValue > 1) {
      // Sprawdź, czy wartość nie jest ujemna
      inputField.value = currentValue - 1; // Zmniejsz wartość o 1
    }
  });
}
