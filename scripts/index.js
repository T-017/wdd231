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
]

document.getElementById("currentYear").innerHTML = document.currentYear = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;