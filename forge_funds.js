const tabs_0 = document.querySelectorAll(".new-tab-card-0");
const innerTab2_0 = document.getElementsByClassName("inner-tab-2-0")[0];
const contents_0 = document.querySelectorAll(".new-tab-content-0");

tabs_0.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs_0.forEach((t) => t.classList.remove("active"));
    contents_0.forEach((c) => c.classList.add("d-none"));

    tab.classList.add("active");

    document
      .getElementById(tab.getAttribute("data-tab"))
      .classList.remove("d-none");
    if (index === 1 && innerTab2_0) {
      innerTab2_0.style.backgroundColor = "black"; // Apply black background to innerTab2
    } else if (innerTab2_0) {
      innerTab2_0.style.backgroundColor = ""; // Reset background color for other tabs
    }
  });
});

const tabs = document.querySelectorAll(".new-tab-card");
const innerTab2 = document.getElementsByClassName("inner-tab-2")[0];
const contents = document.querySelectorAll(".new-tab-content");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    contents.forEach((c) => c.classList.add("d-none"));

    tab.classList.add("active");

    document
      .getElementById(tab.getAttribute("data-tab"))
      .classList.remove("d-none");
    if (index === 1 && innerTab2) {
      innerTab2.style.backgroundColor = "black"; // Apply black background to innerTab2
    } else if (innerTab2) {
      innerTab2.style.backgroundColor = ""; // Reset background color for other tabs
    }
  });
});

//Projects Swiper
$(document).ready(function () {
  const industrySwiper = new Swiper(".projects-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".projects-swiper .swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1660: { slidesPerView: 4 },
    },
  });
});

$(document).ready(function () {
  const value_creation_swiper = new Swiper(".header-swiper", {
    slidesPerView: 1,
    spaceBetween: 80,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".header-swiper .swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

//value-creation-programs
$(document).ready(function () {
  const value_creation_swiper = new Swiper(".value-creation-swiper", {
    slidesPerView: 1,
    // spaceBetween: 80,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".value-creation-swiper .swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
});

$(document).ready(function () {
  const pathways_swiper = new Swiper(".pathways-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 5000,
      // disableOnInteraction: false,
    },
    pagination: {
      el: ".pathways-swiper .swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 2 },
    },
  });
});
