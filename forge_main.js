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

document.addEventListener("DOMContentLoaded", () => {
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
