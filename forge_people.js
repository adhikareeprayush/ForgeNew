// card-slide
$(document).ready(function () {
  const cardSwiper = new Swiper(".card-swiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
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

// Track selected vertical filters
let selectedVerticals = [];

// Function to render team cards based on selected verticals
function renderTeamCards(teamMembers, selectedVerticals = []) {
  const container = document.getElementById("teamCardsContainer");
  container.innerHTML = "";

  // Filter members by selected verticals (if any)
  const filteredMembers =
    selectedVerticals.length === 0
      ? teamData
      : teamData.filter(member =>
          member.verticals.some(v => selectedVerticals.includes(v))
        );

  // Group members by category
  const groupedByCategory = filteredMembers.reduce((acc, member) => {
    const category = member.category || "Others";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(member);
    return acc;
  }, {});

  // Define display order for categories
  const categoryOrder = [
    "Executive Leadership",
    "Executive - General Management",
    "Executive - Program Management",
    "Experts",
    "Enablers",
    "Others"
  ];

  // Render each category and its cards
  categoryOrder.forEach(category => {
    if (groupedByCategory[category] && groupedByCategory[category].length > 0) {
      const heading = document.createElement("div");
      heading.className = "banner-head";
      heading.style.color = "#df6437";
      heading.textContent = category;
      container.appendChild(heading);

      const categoryGrid = document.createElement("div");
      categoryGrid.className = "venture-wrapper";
      container.appendChild(categoryGrid);

      // Sort by name
      groupedByCategory[category].sort((a, b) => a.name.localeCompare(b.name));

      // Render each member card
      groupedByCategory[category].forEach(member => {
        const card = document.createElement("div");
        card.className = "venture-card";
        card.innerHTML = `
          <div class="d-flex position-relative">
            <div class="venture-intro">
              <div class="venture-overlay"></div>
              <div class="position-relative venture-intro-wrapper">
                <a href="${member.linkedin || "#"}" target="_blank">
                  <img class="venture-intro-img" src="assets/People/ventures/Group 3498.png" alt="LinkedIn" />
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
            <img class="venture-card-img" src="${member.image}" alt="${member.name}" />
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
renderTeamCards(teamData, selectedVerticals);

// Toggle filter dropdown on mobile
const filterToggleBtn = document.getElementById("filterToggleBtn");
const verticalsList = document.getElementById("verticalsList");
filterToggleBtn.addEventListener("click", () => {
  verticalsList.classList.toggle("show");
});

// Handle vertical filter selection
verticalsList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const vertical = e.target.getAttribute("data-vertical");

    // Toggle selected vertical
    if (selectedVerticals.includes(vertical)) {
      selectedVerticals = selectedVerticals.filter(v => v !== vertical);
      e.target.classList.remove("active");
    } else {
      selectedVerticals.push(vertical);
      e.target.classList.add("active");
    }

    // Re-render team cards
    renderTeamCards(teamData, selectedVerticals);

    // Close dropdown on small screens
    if (window.innerWidth <= 720) {
      verticalsList.classList.remove("show");
    }
  }
});

// Reset filters to "All"
document.getElementById("allVerticalsBtn").addEventListener("click", () => {
  selectedVerticals = [];
  renderTeamCards(teamData, selectedVerticals);
  verticalsList.querySelectorAll("li").forEach(li => li.classList.remove("active"));
});
