const navGroup = document.querySelectorAll(".nav_group");
const navLinks = document.querySelectorAll("nav .nav-link");

function highlightNav() {
  let activeIndex = -1;

  navGroup.forEach((section, index) => {
    const rect = section.getBoundingClientRect();

    // Check if the section is active
    if (rect.top <= 500 && rect.bottom > 200) {
      activeIndex = index; // Store the index of the active section
    }
  });

  // Remove "active" class from all nav links
  navLinks.forEach((link) => link.classList.remove("active"));

  // Add "active" class to the nav link of the active section
  if (activeIndex !== -1) {
    navLinks[activeIndex].classList.add("active");
  }
}

// Add scroll event listener
window.addEventListener("scroll", highlightNav);
