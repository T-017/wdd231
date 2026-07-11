const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuButton.textContent = navLinks.classList.contains("active") ? "✖" : "☰";
});

const filterButtons = document.querySelectorAll(".filter-button");
const coursesList = document.querySelectorAll(".courses-list");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(button => button.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    coursesList.forEach(list => {
      if (filter === "all") {
        list.style.display = "block";
      } else {
        if (list.getAttribute("data-category") === filter) {
          list.style.display = "block";
        } else {
          list.style.display = "none";
        }
      }
    });
  });
});

filterButtons.forEach(button => {
  button.setAttribute("aria-label", `Filter courses by ${button.textContent}`);
})

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

function updateCourseList(filter) {
  const total = filteredCourses.reduce((accumulator, currentCourse) => {
    return accumulator + currentCourse.credits;
  }, 0);

  const totalCreditsElement = document.getElementById("total-credits");
  totalCreditsElement.textContent = `Total credits for courses listed above: ${total}`;
}

let currentFilter = "all";
function filterCourses(filterType) {
  currentFilter = filterType;
  
  let filteredCourses = courses;

  if (filterType !== "all") {
    filteredCourses = courses.filter(course => course.subject === filterType);
  }
  
  renderCourses(filteredCourses);
  updateCourseList(filteredCourses);

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
    button.addEventListener("click", () => {
      const filterType = button.dataset.filter;
      filterCourses(filterType);
    });
  });

  const menuButton = document.getElementById("menuButton");
  const navLinks = document.getElementById("navLinks");

  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "✖" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
      }
    });
  });

  menuButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      menuButton.click();
    }
  });

  console.log("Page initialized successfully.");
}

window.onload = initializePage;

// document.getElementById("currentYear").innerHTML = document.currentYear = new Date().getFullYear();
// document.getElementById("lastModified").innerHTML = document.lastModified;