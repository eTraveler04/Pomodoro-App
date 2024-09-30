let timerInterval;
let timeLeft;
let isRunning = false;

const timer = {
  pomodoroTime: '25:00',
  shortBreakTime: '5:00',
  longBreakTime: '10:00',
  state: 'pomodoro',
  globalnyKolorP: 'rgb(186, 73, 73)',
  globalnyKolorS: 'rgb(57, 112, 151)',
  globalnyKolorL: 'rgb(56, 133, 138)',
  resztaKolor: 'rgba(255, 255, 255, 0.1)',
  currentTask: null,
};

function pomodoro() {
  resetTimer();
  currentState = 'pomodoro';
  const timerDisplay = document.getElementById('timer');
  timerDisplay.innerHTML = timer.pomodoroTime;
  changeColor(timer.globalnyKolorP);
}
function shortBreak() {
  resetTimer();
  currentState = 'short';
  const timerDisplay = document.getElementById('timer');
  timerDisplay.innerHTML = timer.shortBreakTime;
  changeColor(timer.globalnyKolorS);
}
function longBreak() {
  resetTimer();
  currentState = 'long';
  const timerDisplay = document.getElementById('timer');
  timerDisplay.innerHTML = timer.longBreakTime;
  changeColor(timer.globalnyKolorL);
}

function startPomodoro() {
  const timerDisplay = document.getElementById('timer');

  // Tylko za pierwszym razem
  if (!timerInterval) {
    let timeString = document.getElementById('timer').innerText;
    timeLeft = parseInt(timeString.split(':')[0]);
    timeLeft *= 60;
  }

  timerInterval = setInterval(function () {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    // Dodanie zera do liczb jednocyfrowych
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerDisplay.innerHTML = `${minutes}:${seconds}`;
    timeLeft--;

    // Gdy licznik dojdzie do zera, zatrzymaj odliczanie
    if (timeLeft < 0) {
      if (timer.state === 'pomodoro') {
        timer.currentTask.completedCycles++;
        document.querySelector(timer.currentTask).innerHTML = `
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
        timer.state = 'short';
        shortBreak();
        console.log('zaczynamy short break');
      } else {
        timer.state = 'pomodoro';
        pomodoro();
        console.log('zaczynamy pomodoro');
      }
      snd.play();
      document.addEventListener('click', function () {
        // Zatrzymaj dźwięk po kliknięciu
        snd.pause();
        snd.currentTime = 0; // Resetuj czas odtwarzania na początek
      });
    }
  }, 1000); // Odśwież co sekundę
}
function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  const button = document.getElementById('pomodoro_btn');
  button.textContent = 'START';
  isRunning = false;
}
function toggleStartStop() {
  const button = document.getElementById('pomodoro_btn');

  if (!isRunning) {
    // Gdy nie jest uruchomione, zmień na "STOP" i uruchom funkcję start
    button.textContent = 'PAUSE';
    startPomodoro();
  } else {
    // Gdy jest uruchomione, zmień na "START" i uruchom funkcję stop
    button.textContent = 'START';
    clearInterval(timerInterval);
  }
  // Odwróć stan isRunning
  isRunning = !isRunning;
}

//----------------------------------------------------------------------------------
// Pobierz kolor tła
const pomodoroColorControl = document.getElementById('pomodoroColorControl');
document
  .getElementById('pomodoroColorControl')
  .addEventListener('input', function () {
    timer.globalnyKolorP = this.value;
    if (currentState == 'pomodoro') {
      changeColor(timer.globalnyKolorP);
    }
  });
const shortBreakColorControl = document.getElementById(
  'shortBreakColorControl'
);
document
  .getElementById('shortBreakColorControl')
  .addEventListener('input', function () {
    timer.globalnyKolorS = this.value;
    if (currentState == 'short') {
      changeColor(timer.globalnyKolorS);
    }
  });
const longBreakColorControl = document.getElementById('longBreakColorControl');
document
  .getElementById('longBreakColorControl')
  .addEventListener('input', function () {
    timer.globalnyKolorL = this.value;
    if (currentState == 'long') {
      changeColor(timer.globalnyKolorL);
    }
  });

function changeColor(globalnyKolor) {
  // Zmiana koloru tła body i kontenera z płynnym przejściem
  document.body.style.transition = 'background-color 2s ease';
  document.body.style.backgroundColor = globalnyKolor;

  const box = document.querySelector('.box');
  box.style.transition = 'background-color 2s ease';
  box.style.backgroundColor = timer.resztaKolor;

  const header = document.querySelector('.header');
  header.style.transition = 'background-color 2s ease';
  header.style.backgroundColor = timer.resztaKolor;

  document.querySelectorAll('.start_btn').forEach((przycisk) => {
    przycisk.style.transition = 'color 2s ease';
    przycisk.style.color = globalnyKolor;
  });
}

//----------------------------------------------------------------------------------
// Pobierz element suwaka

let snd = new Audio('rest/alarm1.mp3');

const volumeControl = document.getElementById('volumeControl');

document.getElementById('volumeControl').addEventListener('input', function () {
  snd.play();
});
document.getElementById('closeModalBtn').addEventListener('click', function () {
  snd.pause();
  snd.currentTime = 0; // Resetuj czas odtwarzania
});
volumeControl.addEventListener('input', function () {
  snd.volume = parseFloat(this.value); // Zmień głośność alarmu
});

// Nasłuchuj na zdarzenie "change" (zmiana alarmu)
const alarmList = document.getElementById('alarmList');
alarmList.addEventListener('change', function () {
  snd.pause();
  snd.currentTime = 0;
  snd = new Audio(`rest/${alarmList.value}.mp3`);
});
//----------------------------------------------------------------------------------
// Ustawienia czasu timerów

const pomodoroTimeControl = document.getElementById('pomodoro_input');
pomodoroTimeControl.addEventListener('input', function () {
  timer.pomodoroTime = this.value + ':00';
  if (timer.state === 'pomodoro') {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.innerHTML = timer.pomodoroTime;
  }
});
const shortBreakTimeControl = document.getElementById('shortBreak_input');
shortBreakTimeControl.addEventListener('input', function () {
  timer.shortBreakTime = this.value + ':00';
  if (timer.state === 'short') {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.innerHTML = timer.pomodoroTime;
  }
});
const longBreakTimeControl = document.getElementById('longBreak_input');
longBreakTimeControl.addEventListener('input', function () {
  timer.longBreakTime = this.value + ':00';
  if (timer.state === 'long') {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.innerHTML = timer.pomodoroTime;
  }
});
//----------------------------------------------------------------------------------

const startButton = document.getElementById('pomodoro_btn');

startButton.addEventListener('click', function () {
  toggleStartStop();
  let sound = new Audio('rest/click-234708.mp3');
  sound.volume = 0.15;
  sound.play();
});
