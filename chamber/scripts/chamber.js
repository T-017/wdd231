let membersData = [];

// Member Data Fetching
async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error('Failed to fetch members data');
    }
    membersData = await response.json();
    displayMembers('grid');
  } catch (error) {
    console.error('Error fetching members:', error);
    const container = document.getElementById('member-card');
    container.innerHTML = '<p style="color: red; text-align: center;">Unable to load member data at this time.</p>';
  }
}

// Member Display Function
function displayMembers(viewType) {
  const container = document.getElementById('member-card');
  container.innerHTML = '';
  container.className = viewType === 'grid' ? 'grid-view' : 'list-view';

  membersData.forEach(member => {
    const card = document.createElement('div');
    card.className = 'member-card';

    let membershipClass = '';
    let membershipText = '';
    if (member.membership === 3) {
      membershipClass = 'gold';
      membershipText = 'Gold Member';
    } else if (member.membership === 2) {
      membershipClass = 'silver';
      membershipText = 'Silver Member';
    } else {
      membershipClass = 'member';
      membershipText = 'Member';
    }

    if (viewType === 'grid') {
      //Grid with images
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo" loading="lazy">
        <div class="member-info">
          <span class="membership-badge ${membershipClass}">${membershipText}</span>
          <h3>${member.name}</h3>
          <p class="tagline">${member.tagline}</p>
          <p><strong>EMAIL:</strong> ${member.email}</p>
          <p><strong>PHONE:</strong> ${member.phone}</p>
          <p><strong>URL:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
          <p><strong>ADDRESS:</strong> ${member.address}</p>
        </div>
      `;
    } else {
      // List without images
      card.innerHTML = `
        <div class="member-info">
          <span class="membership-badge ${membershipClass}">${membershipText}</span>
          <h3>${member.name}</h3>
          <p class="tagline">${member.tagline}</p>
          <p><strong>EMAIL:</strong> ${member.email}</p>
          <p><strong>PHONE:</strong> ${member.phone}</p>
          <p><strong>URL:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
          <p><strong>ADDRESS:</strong> ${member.address}</p>
        </div>
      `;
    }

    container.appendChild(card);
  });
}

// Weather API Integration
const weatherapiKey = '4eb3ceb7dc6736a73d8e419d0dafb32c';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=${weatherapiKey}`;

async function apiFetch() {
  try {
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      displayWeather(data);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function displayWeather(data) {
  const container = document.getElementById('weather-data');
  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].description;
  const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  container.innerHTML = `
    <div class="weather-info">
      <h3>${temp}°F</h3>
      <img src="${iconSrc}" alt="${desc} icon">
      <p>${desc}</p>
    </div>
  `;
}

// Spotlight Feature
async function loadMemberSpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (response.ok) {
      membersData = await response.json();
      displaySpotlights();
    }
  } catch (error) {
    console.error('Error loading member spotlights:', error);
  }
}

function getSpotlights() {
  const premium = membersData.filter(m => m.membership >= 2);
  const shuffled = [...premium].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

function displaySpotlights() {
  const container = document.getElementById('spotlight-container');
  const spotlights = getSpotlights();

  container.innerHTML = spotlights.map(member => `
    <div class="spotlight-card">
      <img src="${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.tagline}</p>
      <p><strong>${member.email}</strong></p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    </div>
  `).join('');
}

// Grid and List View Toggle
function setupToggleButtons() {
  const gridButton = document.getElementById('grid-button');
  const listButton = document.getElementById('list-button');

  gridButton.addEventListener('click', () => {
    gridButton.classList.add('active');
    listButton.classList.remove('active');
    displayMembers('grid');
  });

  listButton.addEventListener('click', () => {
    listButton.classList.add('active');
    gridButton.classList.remove('active');
    displayMembers('list');
  });
}

// Menu Toggle for Mobile View
function setupMenuToggle() {
  const menuButton = document.getElementById('menuButton');
  const navLinks = document.getElementById('nav-links');

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      const isExpanded = navLinks.classList.contains('show');
      menuButton.setAttribute('aria-expanded', isExpanded);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// Footer Information Update
function updateFooterInfo() {
  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  const lastModifiedElement = document.getElementById('lastModified');
  if (lastModifiedElement) {
    const lastModifiedDate = new Date(document.lastModified);
    const formattedDate = lastModifiedDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });

    const formattedTime = lastModifiedDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    lastModifiedElement.textContent = `${formattedDate} ${formattedTime}`;  
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menuButton');
  const navLinks = document.getElementById('nav-links');
  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  const yearElement = document.getElementById('currentYear');
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  const lastModifiedElement = document.getElementById('lastModified');
  if (lastModifiedElement) {
    const lastModifiedDate = new Date(document.lastModified);
    const formattedDate = lastModifiedDate.toLocaleDateString('en-US') + ' ' + lastModifiedDate.toLocaleTimeString('en-US', { hour12: false });
    lastModifiedElement.textContent = formattedDate;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  fetchMembers();
  setupToggleButtons();
  setupMenuToggle();
  fetchweather();
  loadMemberSpotlights();
  updateFooterInfo();

  const gridButton = document.getElementById('grid-button');
  if (gridButton) gridButton.classList.add('active');
});

console.log('Chamber directory script loaded successfully.');