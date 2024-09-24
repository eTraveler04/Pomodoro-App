function Task(name, duration, lengthOfCycle) {
  this.name = name;
  this.duration = duration;
  this.lengthOfCycle = lengthOfCycle;
}

let tasks = [];

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

  if (taskTitle !== '' && taskDuration !== null && lengthOfCycle !== null) {
    let task = new Task(taskTitle, taskDuration, lengthOfCycle);
    tasks.push(task);
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
