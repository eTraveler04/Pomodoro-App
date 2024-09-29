function Task(name, duration, lengthOfCycle, id) {
  this.id = id;
  this.name = name;
  this.duration = duration;
  this.lengthOfCycle = lengthOfCycle;
  this.isCompleted = false;
}
Task.index = 0; // Zaczynamy od 0

let tasks = [];

function clearTasks() {
  tasks.length = 0;

  // Czyszczenie
  let tasksDisplay = document.getElementById('task-display');
  tasksDisplay.innerHTML = ``;
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
    document.getElementById('showFormButton').style.display = 'block';
    document.getElementById('taskForm').style.display = 'none';
    document.getElementById('tasksModal').style.display = 'none';
  });

// Zamknij modal, gdy klikniesz poza nim
window.onclick = function (event) {
  const modal = document.getElementById('tasksModal');
  if (event.target == modal) {
    document.getElementById('showFormButton').style.display = 'block';
    document.getElementById('taskForm').style.display = 'none';
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
  showForm();
  const taskTitle = document.getElementById('taskTitle').value;
  const taskDuration = document.getElementById('taskDuration').value;
  const lengthOfCycle = document.getElementById('taskDuration1').value;
  const taskId = Date.now(); // unikalny identyfikator bazujący na czasie

  if (taskTitle !== '' && taskDuration !== null && lengthOfCycle !== null) {
    let task = new Task(taskTitle, taskDuration, lengthOfCycle, taskId);
    tasks.push(task);

    // Znalezienie elementu DOM, do którego będziemy wstawiać dane
    let tasksDisplay = document.getElementById('task-display');

    // Tworzenie elementu div dla taska
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task-show');

    // Tworzenie zawartości HTML dla taska
    taskDiv.innerHTML = `
      <h2><strong>Task Name:</strong> ${task.name}</h2>
      <p><strong>Duration:</strong> ${task.duration} pomodoros</p>
      <p><strong>Length of Cycle:</strong> ${task.lengthOfCycle} minutes</p>
      <button class="delete-task">Delete</button>
      <hr />
    `;

    taskDiv.setAttribute('data-id', task.id);
    let deleteButton = taskDiv.querySelector('.delete-task');

    deleteButton.addEventListener('click', function () {
      taskDiv.remove();
      // Pobranie unikalnego ID
      let taskId = Number(taskDiv.getAttribute('data-id')); // Usunięcie odpowiedniego zadania z tablicy na podstawie ID
      tasks = tasks.filter((task) => task.id !== taskId);
    });
    // Dodanie taskDiv do kontenera tasksDisplay
    tasksDisplay.appendChild(taskDiv);

    console.log(tasks);
    clearInput();
    showForm();
  } else {
    alert('Please fill all the blank spaces!');
  }
}

function clearInput() {
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDuration').value = 1;
  document.getElementById('taskDuration1').value = 25;
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

// ----------------------------
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
// ----------------------------
// Pobierz referencję do elementu w HTML (np. <ul>)
const taskList = document.getElementById('taskList');

// Iteruj po tablicy zadań i dodawaj elementy do listy
tasks.forEach(function (task) {
  // Tworzenie nowego elementu <li> dla każdego zadania
  const listItem = document.createElement('li');

  // Dodanie tekstu do elementu <li> (nazwa zadania i czas trwania)
  listItem.textContent = `${task.name} - ${task.duration}`;

  // Wstawienie <li> do <ul>
  taskList.appendChild(listItem);
});
