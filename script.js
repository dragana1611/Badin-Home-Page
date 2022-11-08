"use strict";

//animated hamburger button
const menuBtn = document.querySelector("#toggle");
const hamburger = document.getElementById("hamburger");
console.log(hamburger);
const navMenu = document.getElementById("nav-menu");
const menuItems = document.querySelector("#overlay");
console.log(menuItems);

const toggleMenu = (e) => {
  e.preventDefault();
  menuItems.classList.toggle("open");
  menuBtn.classList.toggle("full-menu");
};

menuBtn.addEventListener("click", toggleMenu);
document.querySelectorAll(".navigation__link").forEach((lnk) => {
  lnk.addEventListener("click", () => {
    menuBtn.classList.remove(".open");
  });
});

//scroll - change font color

// let rootElement = document.documentElement;

// const handleScroll = () => {
//   if (rootElement.offsetHeight < 1100 || (rootElement.offsetHeight > 8107 && rootElement.offsetHeight > 8616)){
//     //show button
//     hamburger.style.backgroundColor = 'white'
//     hamburger.style.color = 'white'
//   }
// }
// document.addEventListener("scroll", handleScroll);

//gallery scroll-up
const appear = document.querySelectorAll(".appear");
console.log(appear);
const cb = (entries) => {
  entries.forEach((entry) => {
    entry.isIntersecting
      ? entry.target.classList.add("inview")
      : entry.target.classList.remove("inview");
  });
};
const io = new IntersectionObserver(cb);
for (const el of appear) {
  io.observe(el);
}
console.log(io);
