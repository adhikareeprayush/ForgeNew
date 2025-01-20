document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper-container-hero", {
    loop: true,
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    effect: "slide",
    speed: 1000,
  });

  const swiperSection = document.getElementById("swiper-section");
  const topOffset = 200;
  document.querySelectorAll(".slide-image").forEach((image) => {
    image.addEventListener("click", (event) => {
      const targetIndex = parseInt(event.target.getAttribute("data-index"), 10);
      const sectionPosition =
        swiperSection.getBoundingClientRect().top + window.scrollY - topOffset;
      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      });

      swiper.slideTo(targetIndex);
    });
  });
});
