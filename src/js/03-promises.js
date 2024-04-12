import Notiflix from 'notiflix';

// Selektor formularza
const form = document.querySelector('.form');

// Funkcja tworząca obietnicę
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Obsługa wysłania formularza
form.addEventListener('submit', event => {
  event.preventDefault();

  // Pobranie danych z formularza
  const delay = parseInt(form.elements['delay'].value);
  const step = parseInt(form.elements['step'].value);
  const amount = parseInt(form.elements['amount'].value);

  // Wywołanie funkcji createPromise tyle razy, ile wprowadzono w polu "amount"
  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const currentDelay = delay + step * i;

    // Wywołanie createPromise dla każdej obietnicy
    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
