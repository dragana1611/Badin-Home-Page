"use strict";

//animated hamburger button
const menuHamburgerBtn = document.querySelector("#toggle"); //button
//console.log("menuHamburgerBtn", menuHamburgerBtn);
const hamburger = document.getElementById("hamburger"); //span hamburger
//console.log(hamburger);
const navMenu = document.getElementById("nav-menu"); //ul
const menuItems = document.querySelector("#overlay"); //modal-menu background
//console.log(menuItems);
const linkMenuBtn = document.querySelector(".navigation__hamburger-link");
const bigBorderOverlay = document.querySelector(".big-border-overlay");
//console.log({bigBorderOverlay});

linkMenuBtn.addEventListener("mouseenter", (e) => {
  // e.preventDefault();

  linkMenuBtn.classList.add("hover");
  bigBorderOverlay.classList.add("visible");
});

linkMenuBtn.addEventListener("mouseleave", (e) => {
  // e.preventDefault();

  linkMenuBtn.classList.remove("hover");
  bigBorderOverlay.classList.remove("visible");
});

const toggleMenu = (e) => {
  menuItems.classList.toggle("open");
  menuHamburgerBtn.classList.toggle("full-menu");
};

linkMenuBtn.addEventListener("click", (e) => {
  console.log("click");
  e.preventDefault();
  e.target.classList.remove("hover");

  bigBorderOverlay.classList.toggle("open-shrink");
  toggleMenu();
});

//scroll - change hamburger button color

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
  const hamburgerCSBefore = window.getComputedStyle(hamburger, "::before");
  const hamburgerCSAfter = window.getComputedStyle(hamburger, "::after");

  if (foundDarkSection()) {
    menuBtn.style.color = "#ffffff";
    hamburger.style.backgroundColor = "#ffffff";
    hamburger.style.setProperty("--pseudoEl", "#ffffff");
  } else {
    menuBtn.style.color = "#22252ecc";
    hamburger.style.backgroundColor = "#22252ecc";
    hamburger.style.setProperty("--pseudoEl", "#22252ecc");
  }

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
let imgArray = [...images];
const overlays = document.querySelectorAll(".gallery__overlay");
let overlaysArray = [...overlays];

const handleCreatePicturePriview = (e) => {
  const srcImage = e.target.previousElementSibling.getAttribute("src");
  const galleryContainer = document.querySelector(".gallery__container");

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
  item.addEventListener("click", handleCreatePicturePriview);
});

let index = 0;

const handleOutPicturePriview = (e) => {
  const lightImage = document.querySelector(".picturePriview-image");
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

//TESTIMONIAL mobile

//Testimonial Data
const testimonials = [
  {
    name: "Karthik Rao",
    job: "Head of Technology, Eton Institute",
    image:
      "https://www.badinsoft.com/wp-content/themes/badin-soft-theme/assets/badin-photo/testimonials/home/1.png",
    testimonial:
      "Badin and team take complete ownership of the given project or tasks. I would like to mention that the team is very honest and sincere. If a mistake is made, there are no excuses but acceptance and continuing to rectify the situation with the best possible solution and making sure we are satisfied. This comes because of a strong technical presence in the team. We at Eton Institute are happy with the service provided and continue the relationship with BadinSoft in the long run.",
  },
  {
    name: "Dragan Andrejić",
    job: "Software Team Leader, Telekom Srbija",
    image:
      "https://www.badinsoft.com/wp-content/themes/badin-soft-theme/assets/badin-photo/testimonials/home/2.png",
    testimonial:
      "My personal impression after a year and a half of working with the Badin team is that the guys,without having previously encountered the TELCOindustry, easily understood its processes andaccepted to change our in-house solution. The impression is that they work quickly and complement each other perfectly as a team. Their code complies with the requirements. I know that the way requests are received is not the best practice, nor is the frequency and timing of hanges of requests, and that it may bother the guys, but they still remain professionals who try to meet the user requirements as much as they can.",
  },
  {
    name: "Nikola Ristović",
    job: "Head of Satellite Applications Unit, Raiffeisen bank",
    image:
      "https://www.badinsoft.com/wp-content/themes/badin-soft-theme/assets/badin-photo/testimonials/home/3.png",
    testimonial:
      "In our collaboration, we most appreciate your flexibility and ability to quickly adapt to changing customer requirements. We also appreciate the demonstrated competence in all spheres. We would describe the cooperation with you as very motivating and useful for us (hopefully for you too) as we have learned a lot during this project.",
  },
  {
    name: "Geordie Lindsay-Russell",
    job: "Business Analyst Project Management",
    image:
      "https://www.badinsoft.com/wp-content/themes/badin-soft-theme/assets/badin-photo/testimonials/home/4.png",
    testimonial:
      "I have been with Badin since 2017 and had aprivilege to influence our culture, contribute to the career development of my colleagues, and create good systems. The main advantage, and the main reason why I am here is the freedom to create, influence, contribute, and leave my mark.",
  },
  {
    name: "Fangsin Lim",
    job: "COO Tranxactor",
    image:
      "https://www.badinsoft.com/wp-content/themes/badin-soft-theme/assets/badin-photo/testimonials/home/5.png",
    testimonial:
      "Tranxactor has worked with the team behind Badin since the beginning. This highly talented team became the backbone of the software development and support for Tranxactor's product suite as well as the daily technical support for many of our clients around the world. The team works as much a partner as a service provider to Tranxactor, and continues to provide a range of critical services to support Tranxactor and its global clients. We have no hesitation in recommending Badin as a solid and reliable software partner.",
  },
];

const btnLeft = document.querySelector(".arrow-btn--left");
const btnRight = document.querySelector(".arrow-btn--right");
const carouselImgList = document.querySelector(".carousel-mob__list");
const carouselItemName = document.querySelector(".carousel-mob__heading-title");
const carouselItemJob = document.querySelector(
  ".carousel-mob__heading-subtitle"
);
const carouselItemText = document.querySelector(
  ".carousel-mob__paragraph-text-italic"
);

testimonials.forEach((el) => {
  const imgEl = el.image;
  const imgListItem = ` <li
    class="carousel-mob__item"    
  >
    <img
      src= ${imgEl}
    />
  </li>`;
  carouselImgList.insertAdjacentHTML("beforeend", imgListItem);
});

const carouselLiImg = document.querySelectorAll(".carousel-mob__item");
//console.log({ carouselLiImg });
const carouselImgArr = [...carouselLiImg];
console.log({ carouselImgArr });
carouselImgArr[0].classList.add("activeItem");
const imageIndicatorArr = carouselImgArr.map((el) => [...el.children]).flat();
console.log(imageIndicatorArr);

let currentTestimonialSlide = 0;
let totalTestimonialSlides = testimonials.length;

const lrButtonActive = () => {
  let foundActive = false;
  if (carouselImgArr[0].classList.contains("activeItem")) {
    btnLeft.setAttribute("disabled", "disabled");
    btnLeft.firstElementChild.style.color = "#cbcaca";
    return;
  } else {
    btnLeft.removeAttribute("disabled");
    btnLeft.firstElementChild.style.color = "#317ade";
  }

  if (
    carouselImgArr[carouselImgArr.length - 1].classList.contains("activeItem")
  ) {
    btnRight.setAttribute("disabled", "disabled");
    btnRight.firstElementChild.style.color = "#cbcaca";
    return;
  } else {
    btnRight.removeAttribute("disabled");
    btnRight.firstElementChild.style.color = "#317ade";
  }
};
// console.log(carouselImgArr);

const displayTestimonial = () => {
  carouselItemName.textContent = testimonials[currentTestimonialSlide].name;
  carouselItemJob.textContent = testimonials[currentTestimonialSlide].job;
  carouselItemText.textContent =
    testimonials[currentTestimonialSlide].testimonial;
};

imageIndicatorArr.forEach((img) => {
  img.addEventListener("click", (e) => {
    //console.log({ e });
    //console.log("target", e.target);
    for (const pic of carouselImgArr) {
      pic.classList.remove("activeItem");
    }
    let i = imageIndicatorArr.indexOf(e.target);
    console.log({ i });
    carouselImgArr[i].classList.add("activeItem");
    currentTestimonialSlide = i;
    displayTestimonial();
    carouselImgList.style.transform = `translateX(calc(-100px * ${i}))`;
    lrButtonActive();
  });
});

btnLeft.addEventListener("click", () => {
  let foundActive = false;
  currentTestimonialSlide =
    (totalTestimonialSlides + currentTestimonialSlide - 1) %
    totalTestimonialSlides;

  console.log("left button clicked");

  carouselImgArr.forEach((ci) => {
    if (ci.classList.contains("activeItem") && !foundActive) {
      ci.previousElementSibling.classList.add("activeItem");
      displayTestimonial();
      ci.classList.remove("activeItem");
      foundActive = true;
    }
  });

  carouselImgList.style.transform = `translateX(calc(-120px * ${currentTestimonialSlide}))`;

  lrButtonActive();
});

btnRight.addEventListener("click", () => {
  let foundActive = false;
  currentTestimonialSlide =
    (totalTestimonialSlides + currentTestimonialSlide + 1) %
    totalTestimonialSlides;
  console.log("right button clicked");

  carouselImgArr.forEach((ci) => {
    if (ci.classList.contains("activeItem") && !foundActive) {
      ci.nextElementSibling.classList.add("activeItem");
      displayTestimonial();
      ci.classList.remove("activeItem");
      foundActive = true;
    }
  });

  carouselImgList.style.transform = `translateX(calc(-100px * ${currentTestimonialSlide}))`;
  lrButtonActive();
});

//TRUSTEDBY animation
const dataTrustedbyAnimation = document.querySelector(
  ".trustedby-dt__image-box-visible"
);
const dataTrustedbyImg = document.querySelectorAll(".trustedby-dt__image");
const dataTrustedbyImgArr = [...dataTrustedbyImg];
const clonedImgArr = dataTrustedbyImgArr.map((data) => data.cloneNode(true));

const animationInterval = 4000;
const animationTimeout = 1000;

const showClients = () => {
  for (let i = 0; i < 5; i++) {
    if (clonedImgArr.length % 10 !== 0 && clonedImgArr.length % 10 !== 5) {
      clonedImgArr.push(clonedImgArr[i]);
    }
    dataTrustedbyAnimation.appendChild(clonedImgArr[i]);
  }
};

const startFadeAnimation = () => {
  dataTrustedbyAnimation.innerHTML = "";
  showClients();
  setInterval(() => {
    dataTrustedbyAnimation.classList.remove("fade-in");
    dataTrustedbyAnimation.classList.add("fade-out");
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        dataTrustedbyAnimation.removeChild(clonedImgArr[i]);
      }
      for (let i = 0; i < 5; i++) {
        const clients = clonedImgArr.shift();
        clonedImgArr.push(clients);
      }
      for (let i = 0; i < 5; i++) {
        dataTrustedbyAnimation.classList.remove("fade-out");
        dataTrustedbyAnimation.classList.add("fade-in");
        dataTrustedbyAnimation.appendChild(clonedImgArr[i]);
      }
    }, animationTimeout);
  }, animationInterval);
};

window.addEventListener("DOMContentLoaded", startFadeAnimation);

//
