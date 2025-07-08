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




// Function to render team cards grouped by category
function renderTeamCards(teamMembers, selectedVertical = "All") {
  const container = document.getElementById("teamCardsContainer");
  container.innerHTML = "";

  // Filter members by selected vertical
  const filteredMembers = selectedVertical === "All"
    ? teamData
    : teamData.filter(member => member.verticals.includes(selectedVertical));

  // Group members by category
  const groupedByCategory = filteredMembers.reduce((acc, member) => {
    const category = member.category || "Others";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(member);
    return acc;
  }, {});

  // Define category order
  const categoryOrder = [
    "Executive Leadership",
    "Executive - General Management",
    "Executive - Program Management",
    "Experts",
    "Enablers",
    "Others"
  ];

  // Render each category
  categoryOrder.forEach(category => {
    if (groupedByCategory[category] && groupedByCategory[category].length > 0) {
      // Add category heading outside the grid
      const heading = document.createElement("div");
      heading.className = "banner-head";
      heading.style.color = "#df6437";
      heading.textContent = category;
      container.appendChild(heading);

      // Create a grid container for cards
      const categoryGrid = document.createElement("div");
      categoryGrid.className = "venture-wrapper";
      container.appendChild(categoryGrid);

      // Sort members by name within category
      groupedByCategory[category].sort((a, b) => a.name.localeCompare(b.name));

      // Render cards for this category
      groupedByCategory[category].forEach(member => {
        const card = document.createElement("div");
        card.className = "venture-card";
        card.innerHTML = `
          <div class="d-flex position-relative">
            <div class="venture-intro">
              <div class="venture-overlay"></div>
              <div class="position-relative venture-intro-wrapper">
                <a href="${member.linkedin || "#"}" target="_blank">
                  <img
                    class="venture-intro-img"
                    src="assets/People/ventures/Group 3498.png"
                    alt="LinkedIn"
                  />
                </a>
                <div class="d-flex flex-column gap-2 text-white hover-details">
                  <div class="d-flex align-items-center gap-1">
                    <img src="./assets/Icons/location.svg" alt="" width="25">
                    <span class="fw-bold">Station</span>
                  </div>
                  <p>${member.verticals.join(", ")}</p>
                </div>
              </div>
            </div>
            <img
              class="venture-card-img"
              src="${member.image}"
              alt="${member.name}"
            />
            <div class="venture-card-info">
              <span>${member.name}</span>
              <p class="m-0">${member.displayRole}${member.displayRole2 ? `, ${member.displayRole2}` : ""}</p>
            </div>
          </div>
        `;
        categoryGrid.appendChild(card);
      });
    }
  });
}

// Initial render
renderTeamCards(teamData);

// Toggle filter dropdown on small screens
const filterToggleBtn = document.getElementById("filterToggleBtn");
const verticalsList = document.getElementById("verticalsList");
filterToggleBtn.addEventListener("click", () => {
  verticalsList.classList.toggle("show");
});

// Filter team members
verticalsList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const selectedVertical = e.target.getAttribute("data-vertical");
    renderTeamCards(teamData, selectedVertical);

    // Update active state
    verticalsList
      .querySelectorAll("li")
      .forEach((li) => li.classList.remove("active"));
    e.target.classList.add("active");

    // Close dropdown on small screens
    if (window.innerWidth <= 720) {
      verticalsList.classList.remove("show");
    }
  }
});

// All verticals button (for larger screens)
document.getElementById("allVerticalsBtn").addEventListener("click", () => {
  renderTeamCards(teamData, "All");
  verticalsList
    .querySelectorAll("li")
    .forEach((li) => li.classList.remove("active"));
});