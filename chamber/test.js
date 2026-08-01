// discover.js - Renders points of interest and handles last-visit message

import places from '../data/discover.mjs';

const gallery = document.querySelector('#discover-gallery');
const visitMessage = document.querySelector('#visit-message');

// ========== Last Visit Message using localStorage ==========
function displayVisitMessage() {
  const now = Date.now();
  const lastVisit = localStorage.getItem('lastVisit');

  let message = '';

  if (!lastVisit) {
    // First visit
    message = 'Welcome! Let us know if you have any questions.';
  } else {
    const msBetween = now - Number(lastVisit);
    const daysBetween = Math.floor(msBetween / (1000 * 60 * 60 * 24));

    if (daysBetween < 1) {
      message = 'Back so soon! Awesome!';
    } else if (daysBetween === 1) {
      message = 'You last visited 1 day ago.';
    } else {
      message = `You last visited ${daysBetween} days ago.`;
    }
  }

  // Store current visit
  localStorage.setItem('lastVisit', now);

  if (visitMessage) {
    visitMessage.textContent = message;
    visitMessage.classList.add('show');
  }
}

// ========== Build the 8 cards ==========
function displayPlaces() {
  if (!gallery) return;

  places.forEach((place, index) => {
    const card = document.createElement('article');
    card.classList.add('discover-card');
    // Assign named grid areas (card1 – card8)
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

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
  displayVisitMessage();
  displayPlaces();

  // Footer year & last modified
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const lastModSpan = document.getElementById('last-mod');
  if (lastModSpan) {
    const lastModified = new Date(document.lastModified);
    lastModSpan.textContent = lastModified.toLocaleDateString('en-US') + ' ' +
      lastModified.toLocaleTimeString('en-US', { hour12: false });
  }

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('show');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }
});
