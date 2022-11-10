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

//scroll - change color of hamburger button

let rootElement = document.documentElement;

const handleScroll = () => {
  const element = document.querySelector(".hero");
  console.log(element);

  let elementy = element.scrollHeight;

  let x = element.scrollWidth;
  console.log(x);
  const clienty = element.clientHeight;
  console.log(clienty);
  if (clienty > elementy) {
    hamburger.style.backgroundColor = "red";
  }
};
handleScroll();

//gallery translate-up
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
