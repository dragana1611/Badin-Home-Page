"use strict";

const hamburger = document.getElementById("hamburger");
console.log(hamburger)
const navMenu = document.getElementById("nav-menu");
console.log(navMenu)
hamburger.addEventListener("click", (e) => {
  hamburger.classList.toggle("open");
  navMenu.classList.toggle("open");
});

document.querySelectorAll(".navigation__link").forEach((lnk) => {
  lnk.addEventListener("click", () => {
    hamburger.classList.remove(".open");
    navMenu.classList.remove("open");
  });
});
