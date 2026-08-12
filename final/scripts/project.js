let servicesData = [];

// Services Data Fetching ------------------------------------------------------------
async function fetchServices() {
  try {
    const response = await fetch('data/services.json');
    if (!response.ok) {
      throw new Error('Failed to fetch services data');
    }
    servicesData = await response.json();
    displayServices('grid');
  } catch (error) {
    console.error('Error fetching services:', error);
    const container = document.getElementById('services-card');
    container.innerHTML = '<p style="color: red; text-align: center;">Unable to load services data at this time.</p>';
  }
}

// Services Display Function ------------------------------------------------------------
function displayServices(viewType) {
  const container = document.getElementById('services-card');
  container.innerHTML = '';
  container.className = viewType === 'grid' ? 'grid-view' : 'list-view';

  servicesData.forEach(service => {
    const card = document.createElement('div');
    card.className = 'services-card';

    let serviceClass = '';
    let serviceText = '';
    if (service['service-type'] === 2) {
      serviceClass = 'accommodation';
      serviceText = 'Hotel';
    } else if (service['service-type'] === 3) {
      serviceClass = 'transport';
      serviceText = 'Transport';
    } else {
      serviceClass = 'destination';
      serviceText = 'Destination';
    }

    if (viewType === 'grid') {
      //Grid with images
      card.innerHTML = `
        <img src="${service.image}" alt="${service.name} logo" loading="lazy">
        <div class="service-info">
          <span class="service-badge ${serviceClass}">${serviceText}</span>
          <h3>${service.name}</h3>
          <p class="tagline">${service.tagline}</p>
          <p><strong>PHONE:</strong> ${service.phone}</p>
          <p><strong>URL:</strong> <a href="${service.website}" target="_blank" rel="noopener">${service.website}</a></p>
          <p><strong>ADDRESS:</strong> ${service.address}</p>
        </div>
      `;
    } else {
      // List without images
      card.innerHTML = `
        <div class="service-info">
          <span class="service-badge ${serviceClass}">${serviceText}</span>
          <h3>${service.name}</h3>
          <p class="tagline">${service.tagline}</p>
          <p><strong>EMAIL:</strong> ${service.email}</p>
          <p><strong>PHONE:</strong> ${service.phone}</p>
          <p><strong>URL:</strong> <a href="${service.website}" target="_blank" rel="noopener">${service.website}</a></p>
          <p><strong>ADDRESS:</strong> ${service.address}</p>
        </div>
      `;
    }

    container.appendChild(card);
  });
}

// Weather API Integration (OpenWeatherMap) ------------------------------------------------------------
const weatherApiKey = '4eb3ceb7dc6736a73d8e419d0dafb32c';
const weatherSources = [
  {
    name: 'Sapporo',
    url: `https://api.openweathermap.org/data/2.5/weather?lat=43.065683&lon=141.358887&units=metric&appid=${weatherApiKey}`
  },
  {
    name: 'Asahikawa',
    url: `https://api.openweathermap.org/data/2.5/weather?lat=43.768261&lon=142.390639&units=metric&appid=${weatherApiKey}`
  }, 
  {
    name: 'Hakodate',
    url: `https://api.openweathermap.org/data/2.5/weather?lat=41.768793&lon=140.728794&units=metric&appid=${weatherApiKey}`
  }
];

async function apiFetch() {
  try {
    const response = await Promise.all(
      weatherSources.map(source => fetch(source.url))
    );

    const failed = response.find(res => !res.ok);
    if (failed) {
      throw new Error(`Failed to fetch weather data from ${failed.url}`);
    }

    const weatherDataList = await Promise.all(response.map(res => res.json())
    );

    displayWeather(weatherDataList);
    console.log('Weather data fetched successfully:', weatherDataList);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('weather-data').innerHTML =
      '<p class="error">Unable to load weather data at this time.</p>';
  }
}

function displayWeather(weatherDataList) {
  const container = document.getElementById('weather-data');
  const cardsHtml = weatherDataList.map(data => {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const feelsLike = Math.round(data.main.feels_like);
    const humidity = data.main.humidity;

    return `
      <div class="weather-card">
        <h2>${data.name}</h2>
        <div class="main-info">
          <img src="${iconSrc}" alt="${desc}" class="weather-icon">
          <div>
            <h3>${temp}°C</h3>
            <p class="description">${desc}</p>
            <p class="feels-like">Feels like: ${feelsLike}°C</p>
            <p class="humidity">Humidity: ${humidity}%</p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="weather-grid">
      ${cardsHtml}
    </div>
  `;
}

// Spotlight Feature ------------------------------------------------------------
async function loadServiceSpotlights() {
  try {
    const response = await fetch('data/services.json');
    if (response.ok) {
      servicesData = await response.json();
      displaySpotlights();
    }
  } catch (error) {
    console.error('Error loading service spotlights:', error);
  }
}

function getSpotlights() {
  const premium = servicesData.filter(m => m['service-type'] >= 2);
  const shuffled = [...premium].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
}

function displaySpotlights() {
  const container = document.getElementById('spotlight-container');
  const spotlights = getSpotlights();

  container.innerHTML = spotlights.map(service => `
    <div class="spotlight-card">
      <img src="${service.image}" alt="${service.name}">
      <h3>${service.name}</h3>
      <p>${service.tagline}</p>
      <a href="${service.website}" target="_blank">Visit Website</a>
    </div>
  `).join('');
}

// Grid and List View Toggle ------------------------------------------------------------
function setupToggleButtons() {
  const gridButton = document.getElementById('grid-button');
  const listButton = document.getElementById('list-button');

  gridButton.addEventListener('click', () => {
    gridButton.classList.add('active');
    listButton.classList.remove('active');
    displayServices('grid');
  });

  listButton.addEventListener('click', () => {
    listButton.classList.add('active');
    gridButton.classList.remove('active');
    displayServices('list');
  });
}

// Menu Toggle for Mobile View ------------------------------------------------------------
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

// Membership Timestamp ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const timestampInput = document.getElementById('timestamp');
  if (timestampInput) {
    const now = new Date();
    timestampInput.value = now.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  }

  // Membership modal
  const infoButtons = document.querySelectorAll('.info-button');
  const closeButtons = document.querySelectorAll('.close-modal');

  infoButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.showModal();
      }
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const dialog = button.closest('dialog');
      if (dialog) {
        dialog.close();
      }
    });
  });

  // Close modal when clicking on the backdrop
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        dialog.close();
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const container = document.getElementById('submitted-data');

  // Required to display
  const fields = [
    { key: 'fname', label: 'First Name' },
    { key: 'email', label: 'Email' },
    { key: 'sub-date', label: 'Subscription Start Date' },
    { key: 'timestamp', label: 'Timestamp' }
  ];

  let html = '';
  fields.forEach(field => {
    const value = params.get(field.key) || 'Not provided';
    html += `<p><strong>${field.label}:</strong>${value}</p>`;
  });
  container.innerHTML = html;
});

// Footer Information Update ------------------------------------------------------------
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
  loadServiceSpotlights();
  fetchServices();
  apiFetch();
  setupToggleButtons();
  setupMenuToggle();
  updateFooterInfo();

  const gridButton = document.getElementById('grid-button');
  if (gridButton) gridButton.classList.add('active');
});

console.log('Chamber directory script loaded successfully.');