// Filter Menu
document.addEventListener("DOMContentLoaded", () => {
  const filterMenu = document.getElementById("filter-menu");
  const toggleButton = document.getElementById("toggle-filter");

  toggleButton.addEventListener("click", () => {
    filterMenu.classList.toggle("show-menu");
    toggleButton.classList.toggle("show-menu");
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
