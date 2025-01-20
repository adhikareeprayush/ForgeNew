document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const contactButton = document.querySelector(".btn-orange");
  const closeMenu = document.querySelector(".close-menu");
  const navLogo = document.getElementById("nav-logo");
  document.addEventListener("scroll", () => {
    const navbar = document.querySelector("nav");
    if (window.scrollY > 80) {
      navbar.classList.add("scrolled");
      navLogo.classList.remove("d-none");
    } else {
      navbar.classList.remove("scrolled");
      navLogo.classList.add("d-none");
    }
  });

  // Toggle mobile menu visibility
  hamburgerMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
    mobileMenu.classList.toggle("hide");
  });
  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
    mobileMenu.classList.toggle("hide");
  });

  // Close mobile menu on link or button click
  [...navLinks, contactButton].forEach((element) => {
    element.addEventListener("click", () => {
      mobileMenu.classList.add("hide");
      mobileMenu.classList.remove("show");
    });
  });
});
