function Task(name, duration, lengthOfCycle, id) {
  this.id = id;
  this.name = name;
  this.duration = duration;
  this.completedCycles = 0;
  this.lengthOfCycle = lengthOfCycle;
  this.isCompleted = false;
}

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
      <div> 
      <input type="checkbox" id="taskCheckbox" class="checkbox-img">
      <label for="taskCheckbox" class="label-img">
      <img src="rest/noCheckmark.png" id="checkboxImage" alt="Checkbox Image"/>
    </label>
      <h2>${task.name}</h2>
      </div>
      <div>
      <p> ${task.completedCycles} / ${task.duration}</p>
      <p style="margin-left:5px" > ${task.lengthOfCycle} min</p>
      <button class="delete-task">
      <img class="taskDotBtn" src="rest/three-dots-vertical.svg">
      </button>
      </div>

    `;

    taskDiv.addEventListener('click', function () {
      timer.currentTask = task;
      // Zmiana czasu timera
      timer.pomodoroTime = task.lengthOfCycle + ':00';
      const timerDisplay = document.getElementById('timer');
      timerDisplay.innerHTML = timer.pomodoroTime;
      // Poprawa inputu w settings
      document.getElementById('pomodoro_input').value = task.lengthOfCycle;
      // Zmiana wygladu (wcisniecie)
      document.querySelectorAll('.task-show').forEach(function (task) {
        task.classList.remove('clicked');
      });

      if (!this.classList.contains('clicked')) {
        this.classList.add('clicked');
      }
    });

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

    // Checkbox
    const checkbox = taskDiv.querySelector('#taskCheckbox');
    const image = taskDiv.querySelector('#checkboxImage');

    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        image.src = 'rest/doneCheckmark.png'; // Zmieniamy obrazek na zaznaczony
      } else {
        image.src = 'rest/noCheckmark.png'; // Przywracamy oryginalny obrazek
      }
    });

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
