"use strict";

//animated hamburger button
const menuBtn = document.querySelector("#toggle");
const hamburger = document.getElementById("hamburger");
console.log(hamburger);
const navMenu = document.getElementById("nav-menu");
const menuItems = document.querySelector("#overlay");
console.log(menuItems);

const toggleMenu = (e) =>{
  e.preventDefault();
  menuItems.classList.toggle("open");
  menuBtn.classList.toggle("full-menu");
}

menuBtn.addEventListener("click", toggleMenu, false);
// document.querySelectorAll(".navigation__link").forEach((lnk) => {
//   lnk.addEventListener("click", () => {
//     menuBtn.classList.remove(".open");    
//   });
// });
