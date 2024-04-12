import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// Funkcja pomocnicza do dodawania wiodącego zera
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Selektory do elementów interfejsu
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

// Zapisujemy datę końcową odliczania jako zmienną globalną
let endDate;

// Obsługa kliknięcia przycisku "Start"
startButton.addEventListener('click', () => {
  // Pobieramy wybraną datę z inputa
  endDate = new Date(document.querySelector('#datetime-picker').value);

  // Obliczamy początkową różnicę czasu między wybraną datą a teraźniejszością
  let timeDifference = endDate.getTime() - Date.now();

  // Sprawdzamy, czy wybrana data jest w przyszłości
  if (timeDifference <= 0) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }

  // Odświeżamy wartości licznika na starcie
  updateCountdown(timeDifference);

  // Rozpoczynamy odliczanie czasu
  const countdownInterval = setInterval(() => {
    // Obliczamy aktualną różnicę czasu między wybraną datą a teraźniejszością
    timeDifference = endDate.getTime() - Date.now();

    // Aktualizujemy wartości licznika
    updateCountdown(timeDifference);

    // Zatrzymujemy odliczanie, gdy osiągnięto wybraną datę
    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      Notiflix.Notify.success('Countdown finished!');
    }
  }, 1000);
});

// Funkcja do aktualizacji wartości licznika
function updateCountdown(timeDifference) {
  // Obliczamy wartości dni, godzin, minut i sekund
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Wyświetlamy wartości w interfejsie
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

// Ustawienia dla biblioteki flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    // Sprawdzenie, czy wybrana data jest w przyszłości
    if (selectedDate.getTime() <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

// Inicjalizacja flatpickr na elemencie input
flatpickr('#datetime-picker', options);
