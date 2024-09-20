let timerInterval;
let timeLeft; 
let isRunning = false;
let snd = new Audio('alarm.mp3');


const timer = {
   pomodoroTime : '25:00',
   shortBreakTime : '5:00',
   longBreakTime : '10:00',
}


// Pobierz element suwaka
const volumeControl = document.getElementById('volumeControl');
// Rozpocznij odtwarzanie alarmu po kliknięciu przycisku
document.getElementById('volumeControl').addEventListener('input', function() {
snd.play();
});
document.getElementById('closeModalBtn').addEventListener('click', function() {
snd.pause();
});
// Nasłuchiwacz zdarzeń na zmianę wartości suwaka głośności
volumeControl.addEventListener('input', function() {
    snd.volume = parseFloat(this.value); // Zmień głośność alarmu
});

// Pobierz element suwaka
const pomodoroTimeControl = document.getElementById('pomodoro_input');
// Nasłuchiwacz zdarzeń na zmianę wartości suwaka 
pomodoroTimeControl.addEventListener('input', function() {
  timer.pomodoroTime = this.value + ':00';
});

// Pobierz element suwaka
const shortBreakTimeControl = document.getElementById('longBreak_input');
// Nasłuchiwacz zdarzeń na zmianę wartości suwaka 
shortBreakTimeControl.addEventListener('input', function() {
  timer.shortBreakTime = this.value + ':00';
});

// Pobierz element suwaka
const longBreakTimeControl = document.getElementById('shortBreak_input');
// Nasłuchiwacz zdarzeń na zmianę wartości suwaka 
longBreakTimeControl.addEventListener('input', function() {
  timer.longBreakTime = this.value + ':00';
});

function pomodoro() {
  resetTimer()
  const timerDisplay = document.getElementById("timer");
  timerDisplay.innerHTML = timer.pomodoroTime;

  let globalnyKolor = "rgb(186, 73, 73)";
  let resztaKolor = "rgba(255, 255, 255, 0.1)"
  // Zmiana koloru tła body i kontenera
  document.body.style.backgroundColor = globalnyKolor;
  document.querySelector(".box").style.backgroundColor = resztaKolor;
  document.querySelector(".header").style.backgroundColor = resztaKolor;
  document.querySelectorAll(".start_btn").forEach(przycisk => {
    przycisk.style.color = globalnyKolor;
  });

}
function shortBreak() {
  resetTimer()
  const timerDisplay = document.getElementById("timer");
  timerDisplay.innerHTML = timer.shortBreakTime;

  // zmiana koloru 

  let globalnyKolor = "rgb(57, 112, 151)";
  let resztaKolor = "rgba(255, 255, 255, 0.1)"
  // Zmiana koloru tła body i kontenera
  document.body.style.backgroundColor = globalnyKolor;
  document.querySelector(".box").style.backgroundColor = resztaKolor;
  document.querySelector(".header").style.backgroundColor = resztaKolor;
  document.querySelectorAll(".start_btn").forEach(przycisk => {
    przycisk.style.color = globalnyKolor;
  });



}
function longBreak() { 
  resetTimer()
  const timerDisplay = document.getElementById("timer");
  timerDisplay.innerHTML = timer.longBreakTime;

  let globalnyKolor = "rgb(56, 133, 138)";
  let resztaKolor = "rgba(255, 255, 255, 0.1)"
  // Zmiana koloru tła body i kontenera
  document.body.style.backgroundColor = globalnyKolor;
  document.querySelector(".box").style.backgroundColor = resztaKolor;
  document.querySelector(".header").style.backgroundColor = resztaKolor;
  document.querySelectorAll(".start_btn").forEach(przycisk => {
    przycisk.style.color = globalnyKolor;
  });


}

function startPomodoro() {
  const timerDisplay = document.getElementById("timer");

  // Tylko za pierwszym razem 
  if(!timerInterval){
    let timeString = document.getElementById('timer').innerText;
    timeLeft = parseInt(timeString.split(":")[0]);
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
      pomodoro()
      snd.play();
      document.addEventListener("click", function() {
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
  const button = document.getElementById("pomodoro_btn");
  button.textContent ="START";
  isRunning = false;

}


function toggleStartStop() {
  const button = document.getElementById("pomodoro_btn");

  if (!isRunning) {
      // Gdy nie jest uruchomione, zmień na "STOP" i uruchom funkcję start
      button.textContent = "PAUSE";
      startPomodoro();

  } else {
      // Gdy jest uruchomione, zmień na "START" i uruchom funkcję stop
      button.textContent = "START";
      clearInterval(timerInterval);
  }
  // Odwróć stan isRunning
  isRunning = !isRunning;
}
