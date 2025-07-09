let teamMembers = [];
let selectedVerticals = [];
let selectedCategories = [];

const fetchData = async () => {
  try {
    console.log("Fetching team data...");
    const response = await fetch("https://admin-delta-rosy.vercel.app/api/people");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const apiResponse = await response.json();
    console.log("API Response:", apiResponse);

    // Check if data exists and is an array
    if (!apiResponse.data || !Array.isArray(apiResponse.data)) {
      console.error("Invalid API response structure:", apiResponse);
      return;
    }

    teamMembers = apiResponse.data.map(person => {
      // Handle verticals - check if attributes exist and have verticles
      let verticals = [];
      if (person.attributes && Array.isArray(person.attributes)) {
        verticals = person.attributes
          .map(attr => attr.verticles || attr.vertical) // Handle both naming conventions
          .filter(v => v && v.trim() !== ""); // Filter out empty/null values
      }
      if (verticals.length === 0) verticals = ["All"];

      // Handle attributes
      const attributes = person.attributes && Array.isArray(person.attributes) 
        ? person.attributes.map(attr => ({
            verticals: attr.verticles || attr.vertical || "",
            category: attr.category || "",
            role: Array.isArray(attr.role) ? attr.role : (attr.role ? [attr.role] : [])
          }))
        : [];

      // Get all roles for initial display
      const roles = attributes.flatMap(attr => attr.role).filter(r => r && r.trim() !== "");
      const displayRole2 = roles.length > 0 ? roles.join(", ") : "";

      return {
        name: person.name || "Unknown",
        verticals: verticals,
        category: (person.attributes && person.attributes[0]?.category) || "Others",
        displayRole: person.role || "N/A",
        displayRole2: displayRole2,
        attributes: attributes,
        image: person.photo?.url || "assets/People/ventures/Mask Group 2.png",
        linkedin: person.linkedInUrl || "#",
        email: person.email || "",
        about: person.writeUp || "",
        station: person.station || "N/A"
      };
    });

    console.log("Transformed team members:", teamMembers);
    
    // Always render cards after data is loaded
    renderTeamCards(teamMembers, selectedVerticals, selectedCategories);
  } catch (error) {
    console.error("Fetch error:", error);
    // Show error message to user
    const container = document.getElementById("teamCardsContainer");
    if (container) {
      container.innerHTML = `<div class="col-12 text-center"><p class="text-danger">Failed to load team data. Please try again later.</p></div>`;
    }
  }
};

const fetchVerticals = async () => {
  try {
    console.log("Fetching verticals...");
    const response = await fetch("https://admin-delta-rosy.vercel.app/api/verticles");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const apiResponse = await response.json();
    console.log("Verticals API Response:", apiResponse);

    const verticalsList = document.getElementById("verticalsList");
    if (verticalsList && apiResponse.data && apiResponse.data.Verticles) {
      verticalsList.innerHTML = "";
      apiResponse.data.Verticles.forEach(vertical => {
        const li = document.createElement("li");
        li.textContent = vertical.name;
        li.setAttribute("data-vertical", vertical.name);
        li.addEventListener("click", () => {
          if (selectedVerticals.includes(vertical.name)) {
            selectedVerticals = selectedVerticals.filter(v => v !== vertical.name);
            li.classList.remove("active");
          } else {
            selectedVerticals.push(vertical.name);
            li.classList.add("active");
          }
          console.log("Selected verticals:", selectedVerticals);
          renderTeamCards(teamMembers, selectedVerticals, selectedCategories);
        });
        verticalsList.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Verticals fetch error:", error);
  }
};

const fetchCategories = async () => {
  try {
    console.log("Fetching categories...");
    const response = await fetch("https://admin-delta-rosy.vercel.app/api/category");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const apiResponse = await response.json();
    console.log("Categories API Response:", apiResponse);

    const categoriesList = document.getElementById("categoriesList");
    if (categoriesList && apiResponse.data && apiResponse.data.categories) {
      categoriesList.innerHTML = "";
      apiResponse.data.categories.forEach(category => {
        const li = document.createElement("li");
        li.textContent = category.name;
        li.setAttribute("data-category", category.name);
        li.addEventListener("click", () => {
          if (selectedCategories.includes(category.name)) {
            selectedCategories = selectedCategories.filter(c => c !== category.name);
            li.classList.remove("active");
          } else {
            selectedCategories.push(category.name);
            li.classList.add("active");
          }
          console.log("Selected categories:", selectedCategories);
          renderTeamCards(teamMembers, selectedVerticals, selectedCategories);
        });
        categoriesList.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Categories fetch error:", error);
  }
};

function renderTeamCards(members, verticals = [], categories = []) {
  console.log("Rendering team cards...");
  console.log("Members:", members);
  console.log("Selected verticals:", verticals);
  console.log("Selected categories:", categories);

  const container = document.getElementById("teamCardsContainer");
  if (!container) {
    console.error("Team cards container not found");
    return;
  }

  // Clear container
  container.innerHTML = "";

  // Check if we have members
  if (!members || members.length === 0) {
    container.innerHTML = `<div class="col-12 text-center"><p>No team members found.</p></div>`;
    return;
  }

  // Filter members by verticals and categories
  let filteredMembers = members;
  
  if (verticals.length > 0) {
    filteredMembers = filteredMembers.filter(member => {
      const hasAllVertical = member.verticals.includes("All");
      const hasMatchingVertical = member.verticals.some(v => verticals.includes(v));
      return hasAllVertical || hasMatchingVertical;
    });
  }
  
  if (categories.length > 0) {
    filteredMembers = filteredMembers.filter(member => categories.includes(member.category));
  }

  console.log("Filtered members:", filteredMembers);

  if (filteredMembers.length === 0) {
    container.innerHTML = `<div class="col-12 text-center"><p>No team members match the selected filters.</p></div>`;
    return;
  }

  // Group members by displayCategory
  const groupedByCategory = filteredMembers.reduce((acc, member) => {
    let displayCategory = member.category;
    let displayVertical = member.verticals[0] || "All";
    let displayRole = member.displayRole;

    // Handle attributes based on vertical filter
    if (member.attributes && Array.isArray(member.attributes) && member.attributes.length > 0) {
      let selectedAttr;

      if (verticals.length === 0) {
        // No verticals filtered: use the first attribute
        selectedAttr = member.attributes[0];
      } else {
        // Vertical filtered: find the first attribute matching one of the selected verticals
        selectedAttr = member.attributes.find(attr => verticals.includes(attr.verticals)) || member.attributes[0];
      }

      // Update display values based on selected attribute
      displayVertical = selectedAttr.verticals || "All";
      displayCategory = selectedAttr.category || "Others";
      const roles = Array.isArray(selectedAttr.role) 
        ? selectedAttr.role.filter(r => r && r.trim() !== "")
        : (selectedAttr.role ? [selectedAttr.role] : []);
      displayRole = roles.length > 0 ? roles.join(", ") : member.displayRole;
    }

    // Store the display values in the member object for grouping
    member.displayCategory = displayCategory;
    member.displayVertical = displayVertical;
    member.displayRole = displayRole;

    if (!acc[displayCategory]) acc[displayCategory] = [];
    acc[displayCategory].push(member);
    return acc;
  }, {});

  console.log("Grouped by category:", groupedByCategory);

  // Get sorted category keys
  const categoryKeys = Object.keys(groupedByCategory).sort();

  // Render each category
  categoryKeys.forEach(category => {
    // Create category heading
    const heading = document.createElement("div");
    heading.className = "banner-head";
    heading.textContent = category;
    container.appendChild(heading);

    // Create category grid
    const categoryGrid = document.createElement("div");
    categoryGrid.className = "venture-wrapper";
    container.appendChild(categoryGrid);

    // Sort members alphabetically within category
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
              <a href="${member.linkedin}" target="_blank">
                <img class="venture-intro-img" src="assets/People/ventures/Group 3498.png" alt="LinkedIn" />
              </a>
              <div class="d-flex flex-column gap-2 text-white hover-details">
                <div class="d-flex align-items-center gap-1">
                  <img src="./assets/Icons/location.svg" alt="" width="25">
                  <span class="fw-bold">${member.station}</span>
                </div>
                <p>${member.about}</p>
              </div>
            </div>
          </div>
          <img class="venture-card-img" src="${member.image}" alt="${member.name}" />
          <div class="venture-card-info">
            <span>${member.name}</span>
            <p class="m-0">${member.displayRole}</p>
          </div>
        </div>
      `;
      categoryGrid.appendChild(card);
    });
  });

  console.log("Team cards rendered successfully");
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing...");
  fetchData();
  fetchVerticals();
  fetchCategories();
});

// jQuery ready function for additional functionality
$(document).ready(function () {
  console.log("jQuery ready");
  
  // Initialize Swiper
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

  // Filter toggle functionality
  const filterToggleBtn = document.getElementById("filterToggleBtn");
  const verticalsList = document.getElementById("verticalsList");
  if (filterToggleBtn && verticalsList) {
    filterToggleBtn.addEventListener("click", () => {
      verticalsList.classList.toggle("show");
    });
  }

  // All verticals button
  const allVerticalsBtn = document.getElementById("allVerticalsBtn");
  if (allVerticalsBtn) {
    allVerticalsBtn.addEventListener("click", () => {
      console.log("All verticals button clicked");
      selectedVerticals = [];
      selectedCategories = [];
      
      // Remove active class from all filter items
      const verticalItems = document.querySelectorAll("#verticalsList li");
      const categoryItems = document.querySelectorAll("#categoriesList li");
      
      verticalItems.forEach(li => li.classList.remove("active"));
      categoryItems.forEach(li => li.classList.remove("active"));
      
      // Re-render with no filters
      renderTeamCards(teamMembers, [], []);
    });
  }
});