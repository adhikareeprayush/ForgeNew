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
    breakpoints: {
      1024: { slidesPerView: 2 },
      1660: { slidesPerView: 2 },
    },
  });
});
