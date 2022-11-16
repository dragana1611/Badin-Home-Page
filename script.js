"use strict";

//animated hamburger button
const menuHamburgerBtn = document.querySelector("#toggle");
//console.log("menuHamburgerBtn", menuHamburgerBtn);

const hamburger = document.getElementById("hamburger");
//console.log(hamburger);

const navMenu = document.getElementById("nav-menu");

const menuItems = document.querySelector("#overlay");
//console.log(menuItems);

const toggleMenu = (e) => {
  e.preventDefault();
  menuItems.classList.toggle("open");
  menuHamburgerBtn.classList.toggle("full-menu");
};

menuHamburgerBtn.addEventListener("click", toggleMenu);
document.querySelectorAll(".navigation__link").forEach((lnk) => {
  lnk.addEventListener("click", () => {
    menuHamburgerBtn.classList.remove(".open");
  });
});

//scroll - change color of hamburger button

const rootElement = document.documentElement;
let lastKnownScrollPosition = 0;
const darkBgSections = document.querySelectorAll(".dark-bg");
const darkBgSectionsArr = [...darkBgSections];

const handleScrollHamburgerButton = () => {
  lastKnownScrollPosition = Math.ceil(window.scrollY);
  const menuBtn = document.querySelector(".navigation__button");
  const menuBtnScrollHeight =
    Math.ceil(menuBtn.getBoundingClientRect().y) + menuBtn.offsetHeight;

  const foundDarkSection = () => {
    let foundSection = false;
    darkBgSectionsArr.forEach((section) => {
      const sectionTop = Math.abs(section.offsetTop) - menuBtnScrollHeight;
      const sectionBottom =
        Math.abs(section.offsetTop) +
        section.offsetHeight -
        menuBtnScrollHeight;

      if (
        lastKnownScrollPosition >= sectionTop &&
        lastKnownScrollPosition < sectionBottom
      ) {
        foundSection = true;
      }
    });
    return foundSection;
  };
  //console.log(foundDarkSection());
  if (foundDarkSection()) {
    menuBtn.style.color = "red";
    // console.log("if");
  } else {
    menuBtn.style.color = "green";
    // console.log("else");
  }

  //
  // if (
  //   lastKnownScrollPosition >= sectionTop &&
  //   lastKnownScrollPosition < sectionBottom
  //   && !foundSection
  // ) {
  //   foundSection = true;
  //   menuBtn.style.color = "red"
  // } else {
  //   menuBtn.style.color = "green";
  //   // console.log("else");
  // };

  //

  // console.log({ menuBtnScrollHeight });
  // console.log(
  //   "menuBtn.getBoundingClientRect().y",
  //   menuBtn.getBoundingClientRect().y
  // );
  // console.log("menuBtn.offsetHeight", menuBtn.offsetHeight);
  // console.log("menuBtn.offsetTop", menuBtn.offsetTop);
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
  //console.log("position=", position);

  let calcHeight = rootElement.scrollHeight - rootElement.clientHeight;
  // console.log("calcHeight=", calcHeight);

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

//gallery picture preview modal
const images = document.querySelectorAll(".home-img-dt");
//console.log(images);
let imgArray = [...images];
// console.log(imgArray);

const overlays = document.querySelectorAll(".gallery__overlay");
let overlaysArray = [...overlays];

const handleCreatePicturePriview = (e) => {
  const srcImage = e.target.previousElementSibling.getAttribute("src");
  const galleryContainer = document.querySelector(".gallery__container");
  console.log(galleryContainer);
  console.log(srcImage);

  // console.log(e.target);
  const picturePriviewContent = `
    <div class="picturePriview">
      <button class="arrow-btn arrow-btn--left"">
        <i class="fa-solid fa-left-long arrow picturePriview-prev"></i>
      </button>
      <div class="picturePriview-content">        
      <img
        src="${srcImage}"
        alt=""
        class="picturePriview-image"
      />                  
      </div>
      <button class="arrow-btn arrow-btn--right">
          <i class="fa-solid fa-right-long arrow picturePriview-next"></i>
      </button>
    </div>
    `;
  
  galleryContainer.insertAdjacentHTML("beforeend", picturePriviewContent);
};

overlaysArray.forEach((item) => {
   console.log(item);
  item.addEventListener("click", handleCreatePicturePriview);
});

let index = 0;

const handleOutPicturePriview = (e) => {
  const lightImage = document.querySelector(".picturePriview-image");
  // console.log(lightImage);
  let imageSrc = "";

  const ChangeLinkImage = (index, lightImage) => {
    const newLink = imgArray[index].getAttribute("src");
    lightImage.setAttribute("src", newLink);
  };

  if (!lightImage) return;

  if (e.target.matches(".picturePriview")) {
    const body = e.target.parentNode;
    body.removeChild(e.target);
  } else if (e.target.matches(".picturePriview-next")) {
    imageSrc = lightImage.getAttribute("src");

    index = imgArray.findIndex((item) => item.getAttribute("src") === imageSrc);

    index = index + 1;

    let firstImage = 0;
    if (index > images.length - 1) {
      index = firstImage;
    }

    ChangeLinkImage(index, lightImage);
  } else if (e.target.matches(".picturePriview-prev")) {
    imageSrc = lightImage.getAttribute("src");

    index = imgArray.findIndex((item) => item.getAttribute("src") === imageSrc);

    index = index - 1;

    let lastImage = images.length - 1;
    if (index < 0) {
      index = lastImage;
    }

    ChangeLinkImage(index, lightImage);
  }
};

window.addEventListener("click", handleOutPicturePriview);

