// Modal
document.addEventListener("DOMContentLoaded", () => {
  // const openModal = document.getElementById("openModal");
  // const closeModal = document.getElementById("closeModal");
  // const modal = document.getElementById("modal");

  // if (openModal) {
  //   openModal.addEventListener("click", () => {
  //     modal.style.display = "flex";
  //   });
  // }

  // closeModal.addEventListener("click", () => {
  //   modal.style.display = "none";
  // });

  // window.addEventListener("click", (event) => {
  //   if (event.target === modal) {
  //     modal.style.display = "none";
  //   }
  // });

  function toggleDropdown(buttonId, menuId) {
    const button = document.getElementById(buttonId);
    const menu = document.getElementById(menuId);

    button.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent click from bubbling up
      closeAllDropdowns(); // Close all other dropdowns
      menu.style.display = menu.style.display === "block" ? "none" : "block"; // Toggle the current dropdown
    });
  }

  // Close all dropdowns
  function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll(".dropdown-menu");
    dropdowns.forEach((menu) => {
      menu.style.display = "none";
    });
  }

  // Initialize dropdowns
  toggleDropdown("dropdownButton1", "dropdownMenu1");
  toggleDropdown("dropdownButton2", "dropdownMenu2");
  toggleDropdown("dropdownButton3", "dropdownMenu3");

  // Close all dropdowns when clicking outside
  document.addEventListener("click", closeAllDropdowns);
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
