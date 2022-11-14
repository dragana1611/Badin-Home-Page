"use strict";

//animated hamburger button
const menuBtn = document.querySelector("#toggle");
console.log("menuBtn", menuBtn);

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

const rootElement = document.documentElement;

let lastKnownScrollPosition = 0;

const handleScrollHamburgerButton = () => {
  lastKnownScrollPosition = Math.ceil(window.scrollY);
  console.log("lastKnownScrollPosition-Y", lastKnownScrollPosition);

  const sectionHero = document.querySelector(".hero");

  const sectionHeroScrollHeight = sectionHero.scrollHeight;
  console.log("sectionHeroScrollHeight", sectionHeroScrollHeight);

  const sectionHeroClientHeight = sectionHero.clientHeight;
  console.log("sectionHeroClientHeight", sectionHeroClientHeight);

  const menuBtnScrollHeight = menuBtn.scrollHeight;
  console.log("menuBtnScrollHeight", menuBtnScrollHeight);

  menuBtnScrollHeight > 0 && menuBtnScrollHeight < sectionHeroScrollHeight
    ? (menuBtn.style.color = "white")
    : (menuBtn.style.color = "green");
};

window.addEventListener("scroll", (e) => handleScrollHamburgerButton());
window.addEventListener("load", (e) => handleScrollHamburgerButton());

//gallery scroll-up
const appear = document.querySelectorAll(".appear");

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

//back to top button
const scrollToTop = () => {
  const scrollProgress = document.getElementById("progress");

  const progressValue = document.getElementById("progress-value");

  let position = rootElement.scrollTop;
  console.log("position=", position);

  let calcHeight = rootElement.scrollHeight - rootElement.clientHeight;
  console.log("calcHeight=", calcHeight);

  let scrollValue = Math.round((position * 100) / calcHeight);

  position > 100
    ? (scrollProgress.style.display = "grid")
    : (scrollProgress.style.display = "none");

  scrollProgress.addEventListener("click", () => {
    rootElement.scrollTop = 0;
  });
  scrollProgress.style.background = `conic-gradient(#ffffff ${scrollValue}%, #929292 ${scrollValue}%)`;
};

window.addEventListener("scroll", (e) => scrollToTop());
window.addEventListener("load", (e) => scrollToTop());

//gallery lightbox
const images = document.querySelectorAll(".home-img-dt");
console.log(images);
let imgArray = [...images];
console.log(imgArray);

const overlays = document.querySelectorAll(".gallery__overlay");

const handleCreateLightbox = (e) => {
  const linkImage = e.target.getAttribute("src");

  const lightboxContent = `
              <div class="lightbox">
                <div class="lightbox-content">
                  <button class="lr-button lr-button--left">
                    <i class="fa fa-angle-left lightbox-prev"></i>
                  </button>
                  <img
                    src="${linkImage}"
                    alt=""
                    class="lightbox-image"
                  />
                  <button class="lr-button lr-button--right">
                    <i class="fa fa-angle-right lightbox-next"></i>
                  </button>
                </div>
              </div>
              `;
  document.body.insertAdjacentHTML("beforeend", lightboxContent);
};

window.addEventListener("load", (e) => {
  imgArray.forEach((item) => {
    console.log(item);
    // const nextSibling = item.nextElementSibling;
    // console.log(nextSibling)
    item.nextElementSibling.addEventListener("click", handleCreateLightbox);
  });

  let index = 0;

  document.addEventListener("click", handleOutLightbox);

  function handleOutLightbox(e) {
    const lightImage = document.querySelector(".lightbox-image");

    let imageSrc = "";
    if (!lightImage) return;

    if (e.target.matches(".lightbox")) {
      const body = e.target.parentNode;
      body.removeChild(e.target);
    } else if (e.target.matches(".lightbox-next")) {
      imageSrc = lightImage.getAttribute("src");

      index = imgArray.findIndex(
        (item) => item.getAttribute("src") === imageSrc
      );

      index = index + 1;

      firstImage = 0;
      if (index > images.length - 1) {
        index = firstImage;
      }

      ChangeLinkImage(index, lightImage);
    } else if (e.target.matches(".lightbox-prev")) {
      imageSrc = lightImage.getAttribute("src");

      index = imgArray.findIndex(
        (item) => item.getAttribute("src") === imageSrc
      );

      index = index - 1;

      lastImage = images.length - 1;
      if (index < 0) {
        index = lastImage;
      }

      ChangeLinkImage(index, lightImage);
    }
  }

  const ChangeLinkImage = (index, lightImage) => {
    const newLink = imgArray[index].getAttribute("src");
    lightImage.setAttribute("src", newLink);
  };
});

window.addEventListener("click", (e) => {
  const root = document.documentElement;
  root.dataset.lightbox = "off";
  e.stopPropagation();
});

// const lightImage = document.querySelector(".lightbox-image");
// lightImage.addEventListener("click", (e) => {
//   const root = document.documentElement;
//   root.dataset.lightbox = "off";
//   e.stopPropagation();
// });
