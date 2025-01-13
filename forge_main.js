// tabs
function showTab(tabId) {
  const tabPanes = document.querySelectorAll(".tab-pane");
  tabPanes.forEach((pane) => pane.classList.remove("active"));

  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  document
    .querySelector(`button[onclick="showTab('${tabId}')"]`)
    .classList.add("active");
}

// card-slide
$(document).ready(function () {
  const cardSwiper = new Swiper(".card-swiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: ".card-swiper .swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // breakpoints: {
    //   640: { slidesPerView: 2 },
    //   768: { slidesPerView: 2 },
    //   1024: { slidesPerView: 3 },
    //   1660: { slidesPerView: 4 },
    // },
  });
});
