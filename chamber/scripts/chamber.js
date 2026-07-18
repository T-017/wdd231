let membersData = [];

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
  fetchMembers();
  setupToggleButtons();
  setupMenuToggle();
  updateFooterInfo();

  const gridButton = document.getElementById('grid-button');
  if (gridButton) gridButton.classList.add('active');
});

console.log('Chamber directory script loaded successfully.');