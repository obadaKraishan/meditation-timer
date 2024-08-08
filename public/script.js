let timer;
let timeRemaining;
let isPaused = false;

const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const playSoundBtn = document.getElementById('playSoundBtn');
const pauseSoundBtn = document.getElementById('pauseSoundBtn');
const soundSelect = document.getElementById('soundSelect');
const customizationForm = document.getElementById('customizationForm');

let sound = new Audio('sounds/rain.mp3');

function updateTimerDisplay(minutes, seconds) {
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer(duration) {
  let time = duration;
  timer = setInterval(() => {
    if (!isPaused) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      updateTimerDisplay(minutes, seconds);

      if (--time < 0) {
        clearInterval(timer);
        updateTimerDisplay(0, 0);
        alert('Meditation session complete!');
      }
    }
  }, 1000);
}

startBtn.addEventListener('click', () => {
  if (timeRemaining) {
    isPaused = false;
    startTimer(timeRemaining);
  } else {
    const minutes = parseInt(document.getElementById('sessionMinutes').value) || 0;
    const seconds = parseInt(document.getElementById('sessionSeconds').value) || 0;
    timeRemaining = (minutes * 60) + seconds;
    startTimer(timeRemaining);
  }
});

pauseBtn.addEventListener('click', () => {
  isPaused = true;
  clearInterval(timer);
});

resetBtn.addEventListener('click', () => {
  isPaused = false;
  clearInterval(timer);
  timeRemaining = null;
  updateTimerDisplay(0, 0);
});

playSoundBtn.addEventListener('click', () => {
  sound.play();
});

pauseSoundBtn.addEventListener('click', () => {
  sound.pause();
});

soundSelect.addEventListener('change', (event) => {
  sound.pause();
  switch (event.target.value) {
    case 'forest':
      sound = new Audio('sounds/forest.mp3');
      break;
    case 'lofi':
      sound = new Audio('sounds/lofi.mp3');
      break;
    case 'separation':
      sound = new Audio('sounds/separation.mp3');
      break;
  }
});

customizationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  isPaused = false;
  clearInterval(timer);
  const minutes = parseInt(document.getElementById('sessionMinutes').value) || 0;
  const seconds = parseInt(document.getElementById('sessionSeconds').value) || 0;
  timeRemaining = (minutes * 60) + seconds;
  updateTimerDisplay(minutes, seconds);
});
