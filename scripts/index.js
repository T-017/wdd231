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
    
})

document.getElementById("currentYear").innerHTML = document.currentYear = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;