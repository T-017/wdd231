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

  function displayMembers(viewType) {
    const container = document.getElementById('member-card');
    container.innerHTML = '';
    container.className = viewType === 'grid' ? 'grid-view' : 'list-view';

    membersData.forEach(member => {
      const card = document.createElement('div');
      card.className = 'member-card';

      if (viewType === 'grid') {
        card.innerHTML = `
          <img src="${member.image}" alt="${member.name} logo" loading="lazy">
          <div class="member-info">
            <h3>${member.name}</h3>
            <p class="tagline">${member.tagline}</p>
            <p><strong>EMAIL:</strong> ${member.email}</p>
            <p><strong>PHONE:</strong> ${member.phone}</p>
            <p><strong>URL:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
            <p><strong>ADDRESS:</strong> ${member.address}</p>
          </div>
        `;
      } else {
        card.innerHTML = `
          <div class="member-info">
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
}


// function initializePage() {
//   const currentYearElement = document.getElementById("currentYear");
//   currentYearElement.textContent = new Date().getFullYear();

//   const lastModifiedElement = document.getElementById("lastModified");
//   const lastModifiedDate = new Date(document.lastModified);

//   const formattedDate = lastModifiedDate.toLocaleDateString("en-US", {
//     month: "2-digit",
//     day: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: false
//   }).replace(/,/, "");

//   lastModifiedElement.textContent = formattedDate;

//   // Menu toggle function
//   const menuButton = document.getElementById("menuButton");
//   const navLinks = document.getElementById("nav-links");

//   menuButton.addEventListener("click", () => {
//     const isOpen = navLinks.classList.toggle("open");
//     menuButton.setAttribute("aria-expanded", isOpen);
//     menuButton.textContent = isOpen ? "✖" : "☰";
//   });

//   navLinks.querySelectorAll("a").forEach(navLink => {
//     navLink.addEventListener("click", () => {
//       if (navLinks.classList.contains("open")) {
//         navLinks.classList.remove("open");
//         menuButton.setAttribute("aria-expanded", "false");
//         menuButton.textContent = "☰";
//       }
//     });
//   });
// }

// window.onload = initializePage;