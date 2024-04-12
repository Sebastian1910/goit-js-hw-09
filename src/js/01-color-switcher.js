function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;
let intervalId = null;

startButton.addEventListener('click', () => {
  startButton.disabled = true; // Deaktywuje przycisk "Start"
  stopButton.disabled = false; // Aktywuje przycisk "Stop"
  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
  }, 1000);
});

stopButton.addEventListener('click', () => {
  startButton.disabled = false; // Aktywuje przycisk "Start"
  stopButton.disabled = true; // Deaktywuje przycisk "Stop"
  clearInterval(intervalId);
});
