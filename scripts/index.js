const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Programming Building Blocks",
    credits: 3,
    completed: true
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 3,
    completed: true
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    completed: true
  },
  {
    subject: "WDD",
    number: 131,
    title: "Web Frontend Development I",
    credits: 2,
    completed: true
  },
  {
    subject: "WDD",
    number: 231,
    title: "Web Frontend Development II",
    credits: 2,
    completed: false
  }
];

function renderCourses(filteredCourses) {
  const container = document.getElementById("course-list");
  container.innerHTML = "";

  if (filteredCourses.length === 0) { 
    container.innerHTML = "<p>No courses found.</p>";
    return;
  }

  filteredCourses.forEach(course => { 
    const item = document.createElement("div");
    item.className = `course-item${course.completed ? " completed" : ""}`;
    
    let badgeHTML = "";
    if (course.completed) {
      badgeHTML = `<span class="badge completed">Completed</span>`;
    }
    item.innerHTML = `
        <span class="course-code">${course.subject} ${course.number}</span>
        <span class="course-title">${course.title}</span>
        <span class="course-credits">${course.credits} credits</span>
        ${badgeHTML}
      `;
    container.appendChild(item);
  });
}

function updateTotalCredits(filteredCourses) {
  const total = filteredCourses.reduce((accumulator, currentCourse) => {
    return accumulator + currentCourse.credits;
  }, 0);

  const totalCreditsElement = document.getElementById("total-credits");
  totalCreditsElement.textContent = `Total credit for courses listed above: ${total}`;
}

let currentFilter = "all";

function filterCourses(filterType) {
  currentFilter = filterType;
  
  let filteredCourses = courses;

  if (filterType !== "all") {
    filteredCourses = courses.filter(course => course.subject === filterType);
  }
  
  renderCourses(filteredCourses);
  updateTotalCredits(filteredCourses);

  document.querySelectorAll(".filter-button").forEach(button => {
    button.classList.remove("active");
    button.setAttribute("aria-pressed", "false");

    if (button.dataset.filter === filterType) {
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
    }
  });
}
  
function initializePage() {
  const currentYearElement = document.getElementById("currentYear");
  currentYearElement.textContent = new Date().getFullYear();

  const lastModifiedElement = document.getElementById("lastModified");
  const lastModifiedDate = new Date(document.lastModified);

  const formattedDate = lastModifiedDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).replace(/,/, "");

  lastModifiedElement.textContent = formattedDate;

  filterCourses("all");

  const filterButtons = document.querySelectorAll(".filter-button");
  filterButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const filterType = button.dataset.filter;
      filterCourses(filterType);
    });
  });

  // Menu toggle function
  const menuButton = document.getElementById("menuButton");
  const navLinks = document.getElementById("nav-links");

  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "✖" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(navLink => {
    navLink.addEventListener("click", () => {
      if (navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
      }
    });
  });
}

window.onload = initializePage;