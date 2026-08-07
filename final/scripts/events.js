import places from '../data/events.mjs';

const gallery = document.querySelector('#discover-gallery');
const visitMessage = document.querySelector('#visit-message');

function displayVisitMessage() {
  const now = Date.now();
  const lastVisit = localStorage.getItem('lastVisit');

  let message = '';
  if (!lastVisit) {
    message = 'Welcome! Let us know if you have any questions.';
  } else {
    const msBetween = now - Number(lastVisit);
    const daysBetween = Math.floor(msBetween / (1000 * 60 * 60 * 24));

    if (daysBetween < 1) {
      message = 'Back so soon? Awesome!';
    } else if (daysBetween === 1) {
      message = 'You last visited 1 day ago.';
    } else {
      message = `You last visited ${daysBetween} days ago.`;
    }
  }

  localStorage.setItem('lastVisit', now);
  if (visitMessage) {
    visitMessage.textContent = message;
    visitMessage.classList.add('show');
  }
}

function displayPlaces() {
  if (!gallery) return;

  places.forEach((place, index) => {
    const card = document.createElement('article');
    card.classList.add('discover-card');
    card.style.gridArea = `card${index + 1}`;

    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img src="${place.image}" alt="${place.name}" width="300" height="200" loading="lazy">
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button class="learn-more">Learn More</button>
    `;
    gallery.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  displayVisitMessage();
  displayPlaces();
});