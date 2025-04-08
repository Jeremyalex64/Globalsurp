const header = document.querySelector(".header");
const btn = document.querySelector(".btn-nav");

btn.addEventListener("click", function () {
  header.classList.toggle("nav-open");
});
