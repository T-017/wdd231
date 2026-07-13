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