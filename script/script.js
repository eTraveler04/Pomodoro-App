let timerInterval;
let timeLeft;
let isRunning = false;
let snd = new Audio('rest/alarm.mp3');

const timer = {
  pomodoroTime: '25:00',
  shortBreakTime: '5:00',
  longBreakTime: '10:00',

  globalnyKolorP: 'rgb(186, 73, 73)',
  globalnyKolorS: 'rgb(57, 112, 151)',
  globalnyKolorL: 'rgb(56, 133, 138)',
  resztaKolor: 'rgba(255, 255, 255, 0.1)',
};

function pomodoro() {
  resetTimer();
  const timerDisplay = document.getElementById('timer');
  timerDisplay.innerHTML = timer.pomodoroTime;
  changeColorP();
}
function shortBreak() {
  resetTimer();
  const timerDisplay = document.getElementById('timer');
  timerDisplay.innerHTML = timer.shortBreakTime;
  changeColorS();
}
function longBreak() {
  resetTimer();
  const timerDisplay = document.getElementById('timer');
  timerDisplay.innerHTML = timer.longBreakTime;
  changeColorL();
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
      pomodoro();
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
    changeColorP();
  });
const shortBreakColorControl = document.getElementById(
  'shortBreakColorControl'
);
document
  .getElementById('shortBreakColorControl')
  .addEventListener('input', function () {
    timer.globalnyKolorS = this.value;
    changeColorS();
  });
const longBreakColorControl = document.getElementById('longBreakColorControl');
document
  .getElementById('longBreakColorControl')
  .addEventListener('input', function () {
    timer.globalnyKolorL = this.value;
    changeColorL();
  });

function changeColorP() {
  // Zmiana koloru tła body i kontenera
  document.body.style.backgroundColor = timer.globalnyKolorP;
  document.querySelector('.box').style.backgroundColor = timer.resztaKolor;
  document.querySelector('.header').style.backgroundColor = timer.resztaKolor;
  document.querySelectorAll('.start_btn').forEach((przycisk) => {
    przycisk.style.color = timer.globalnyKolorP;
  });
}
function changeColorL() {
  // Zmiana koloru tła body i kontenera
  document.body.style.backgroundColor = timer.globalnyKolorL;
  document.querySelector('.box').style.backgroundColor = timer.resztaKolor;
  document.querySelector('.header').style.backgroundColor = timer.resztaKolor;
  document.querySelectorAll('.start_btn').forEach((przycisk) => {
    przycisk.style.color = timer.globalnyKolorL;
  });
}
function changeColorS() {
  // Zmiana koloru tła body i kontenera
  document.body.style.backgroundColor = timer.globalnyKolorS;
  document.querySelector('.box').style.backgroundColor = timer.resztaKolor;
  document.querySelector('.header').style.backgroundColor = timer.resztaKolor;
  document.querySelectorAll('.start_btn').forEach((przycisk) => {
    przycisk.style.color = timer.globalnyKolorS;
  });
}
//----------------------------------------------------------------------------------
// Pobierz element suwaka
const volumeControl = document.getElementById('volumeControl');
document.getElementById('volumeControl').addEventListener('input', function () {
  snd.play();
});
document.getElementById('closeModalBtn').addEventListener('click', function () {
  snd.pause();
});
volumeControl.addEventListener('input', function () {
  snd.volume = parseFloat(this.value); // Zmień głośność alarmu
});

//----------------------------------------------------------------------------------
// Ustawienia czasu timerów

const pomodoroTimeControl = document.getElementById('pomodoro_input');
pomodoroTimeControl.addEventListener('input', function () {
  timer.pomodoroTime = this.value + ':00';
  const timerDisplay = document.getElementById('timer');
  timerDisplay.innerHTML = timer.pomodoroTime;
});
const shortBreakTimeControl = document.getElementById('longBreak_input');
shortBreakTimeControl.addEventListener('input', function () {
  timer.shortBreakTime = this.value + ':00';
  const timerDisplay = document.getElementById('timer');
  timerDisplay.innerHTML = timer.shortBreakTime;
});
const longBreakTimeControl = document.getElementById('shortBreak_input');
longBreakTimeControl.addEventListener('input', function () {
  timer.longBreakTime = this.value + ':00';
  const timerDisplay = document.getElementById('timer');
  timerDisplay.innerHTML = timer.longBreakTime;
});
//----------------------------------------------------------------------------------
