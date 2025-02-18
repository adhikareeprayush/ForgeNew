//filter
document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://forgebackend.vercel.app/api/v1/startup"; // Replace with your API URL
  const loader = document.getElementById("loader");
  let startups = [];
  let selectedFilters = {
    futurescope: [],
    stage: [],
    program: [],
    grant: [],
  };
  let currentPage = 1;
  let itemsPerPage = 12;
  let totalPages = 1;
  let filteredStartups = [];

  const showLoader = () => loader.classList.remove("hidden");

  // Hide loader
  const hideLoader = () => loader.classList.add("hidden");

  // Fetch all startups
  const fetchStartups = () => {
    showLoader();
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        startups = data.startups; // Assuming the response has a `startups` array
        totalPages = Math.ceil(startups.length / itemsPerPage); // Update here
        initPagination(startups);
        // renderStartups(startups);
        hideLoader();
      })
      .catch((error) => {
        console.error("Error fetching startups:", error);
        hideLoader();
      });
  };

  fetchStartups();

  // Function to render startups

  const getStartupsForPage = (page, list) => {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    return list.slice(start, end);
  };

  const matchDivHeights = () => {
    const firstDiv = document.querySelector(".filter-container"); // The first div that should adjust height
    const secondDiv = document.querySelector(".data-container"); // The second div containing fetched data

    if (firstDiv && secondDiv) {
      firstDiv.style.height = secondDiv.clientHeight + "px";
    }
  };

  const renderStartups = (list) => {
    // const startupsList = document.getElementById("startupsList");
    // const activeStartups = filteredStartups.filter(
    //   (startup) => startup.status == "Active"
    // );
    const startupsList = document.getElementById("startupsList");

    const activeStartups = list.filter((startup) => startup.status == "Active");
    const startupsToShow = getStartupsForPage(currentPage, activeStartups);

    startupsList.innerHTML = startupsToShow
      .map(
        (startup) => `
            <div data-id="${startup._id}" onclick="showStartupDetails(${
          startup._id
        })" class="data-card px-3 col-12 col-md-6 col-lg-4">
              <img
                class="data-img"
                src="${startup?.logo?.url}"
                alt="${startup?.name || "No Logo"}"
              />
              <p class="data-header m-0">${startup.name}</p>
              <span class="data-desc"
                >${startup.about}</span
              >
            </div>
          `
      )
      .join("");
    updatePaginationControls(activeStartups);

    setTimeout(matchDivHeights, 100);
  };
  window.addEventListener("resize", matchDivHeights);
  // const updatePaginationControls = (filteredStartups) => {
  //   console.log(filteredStartups);
  //   const totalPages = Math.ceil(filteredStartups.length / itemsPerPage);
  //   const paginationContainer = document.getElementById("pagination-container");
  //   paginationContainer.innerHTML = ""; // Clear previous buttons

  //   // Previous Button
  //   const prevButton = document.createElement("button");
  //   prevButton.textContent = "Prev";
  //   prevButton.disabled = currentPage === 1;
  //   prevButton.addEventListener("click", () => goToPage(currentPage - 1));
  //   paginationContainer.appendChild(prevButton);

  //   // Page Number Buttons
  //   for (let i = 1; i <= totalPages; i++) {
  //     const pageButton = document.createElement("button");
  //     pageButton.textContent = i;
  //     pageButton.classList.add("page-btn");

  //     if (i === currentPage) {
  //       pageButton.classList.add("active"); // Highlight current page
  //     }

  //     pageButton.addEventListener("click", () => goToPage(i));
  //     paginationContainer.appendChild(pageButton);
  //   }

  //   // Next Button
  //   const nextButton = document.createElement("button");
  //   nextButton.textContent = "Next";
  //   nextButton.disabled = currentPage === totalPages;
  //   nextButton.addEventListener("click", () => goToPage(currentPage + 1));
  //   paginationContainer.appendChild(nextButton);
  // };

  // const updatePaginationControls = (filteredStartups) => {
  //   console.log(filteredStartups);
  //   const totalPages = Math.ceil(filteredStartups.length / itemsPerPage);
  //   const paginationContainer = document.getElementById("pagination-container");

  //   if (!paginationContainer) {
  //     console.error("Error: #pagination-container not found in the DOM.");
  //     return;
  //   }

  //   paginationContainer.innerHTML = ""; // Clear previous pagination

  //   const createPageButton = (page) => {
  //     const button = document.createElement("button");
  //     button.textContent = page;
  //     button.className = page === currentPage ? "active" : "";
  //     button.onclick = () => goToPage(page);
  //     return button;
  //   };

  //   let pages = new Set();

  //   // Always include the first three pages
  //   for (let i = 1; i <= Math.min(3, totalPages); i++) {
  //     pages.add(i);
  //   }

  //   // Always include the last three pages
  //   for (let i = Math.max(totalPages - 2, 1); i <= totalPages; i++) {
  //     pages.add(i);
  //   }

  //   // Include 3 pages before and after currentPage
  //   for (
  //     let i = Math.max(1, currentPage - 2);
  //     i <= Math.min(totalPages, currentPage + 2);
  //     i++
  //   ) {
  //     pages.add(i);
  //   }

  //   // Convert Set to sorted array
  //   const sortedPages = [...pages].sort((a, b) => a - b);

  //   // Generate pagination buttons
  //   let lastPage = 0;
  //   sortedPages.forEach((page) => {
  //     if (lastPage && page !== lastPage + 1) {
  //       paginationContainer.appendChild(document.createTextNode(" ... "));
  //     }
  //     paginationContainer.appendChild(createPageButton(page));
  //     lastPage = page;
  //   });
  // };

  const updatePaginationControls = (filteredStartups) => {
    console.log(filteredStartups);
    const totalPages = Math.ceil(filteredStartups.length / itemsPerPage);
    const paginationContainer = document.getElementById("pagination-container");

    if (!paginationContainer) {
      console.error("Error: #pagination-container not found in the DOM.");
      return;
    }

    paginationContainer.innerHTML = ""; // Clear previous pagination

    const createPageButton = (text, page, className = "") => {
      const button = document.createElement("button");
      button.textContent = text;
      button.className = page === currentPage ? "active-page" : "";
      if (page === currentPage) {
        button.className = "active-page";
      }
      // button.classList.add(className);
      button.classList.add("pagination-button");
      button.disabled = page === currentPage;
      button.onclick = () => goToPage(page);
      return button;
    };

    // Previous Button
    // if (currentPage > 1) {
    //   paginationContainer.appendChild(
    //     createPageButton("Prev", currentPage - 1, "prev-button")
    //   );
    // }
    if (currentPage > 1 || currentPage === 1) {
      const prevButton = createPageButton(
        "Prev",
        currentPage - 1,
        "prev-button"
      );
      prevButton.disabled = currentPage === 1; // Disable if currentPage is 1
      paginationContainer.appendChild(prevButton);
    }

    let pages = new Set();

    // Always include first three pages
    for (let i = 1; i <= Math.min(2, totalPages); i++) {
      pages.add(i);
    }

    // Always include last three pages
    for (let i = Math.max(totalPages - 1, 1); i <= totalPages; i++) {
      pages.add(i);
    }

    // Include three pages before and after currentPage
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pages.add(i);
    }

    // Convert Set to sorted array
    const sortedPages = [...pages].sort((a, b) => a - b);

    // Generate pagination buttons
    let lastPage = 0;
    sortedPages.forEach((page) => {
      if (lastPage && page !== lastPage + 1) {
        paginationContainer.appendChild(document.createTextNode(" ... "));
      }
      paginationContainer.appendChild(createPageButton(page, page));
      lastPage = page;
    });

    // Next Button
    if (currentPage <= totalPages) {
      const nextButton = createPageButton(
        "Next",
        currentPage + 1,
        "next-button"
      );
      nextButton.disabled = currentPage === totalPages; // Disable if currentPage is the last page
      paginationContainer.appendChild(nextButton);
    }
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderStartups(filteredStartups);
  };

  const initPagination = (startups) => {
    filteredStartups = startups; // Store the filtered startups in global variable
    renderStartups(filteredStartups); // Render startups for the first page
  };

  initPagination(startups);

  const updateClearButtonVisibility = () => {
    const clearFuturescopeButton = document.getElementById("clearFuturescope");
    const clearStageButton = document.getElementById("clearStage");
    const clearProgramButton = document.getElementById("clearProgram");
    const clearGrantButton = document.getElementById("clearGrant");

    if (selectedFilters.futurescope.length > 0) {
      clearFuturescopeButton.style.display = "flex";
      clearFuturescopeButton.style.display = "none";
    }

    if (selectedFilters.stage.length > 0) {
      clearStageButton.style.display = "flex";
    } else {
      clearStageButton.style.display = "none";
    }

    if (selectedFilters.program.length > 0) {
      clearProgramButton.style.display = "flex";
      clearProgramButton.style.display = "none";
    }

    if (selectedFilters.grant.length > 0) {
      clearGrantButton.style.display = "flex";
    } else {
      clearGrantButton.style.display = "none";
    }
  };

  const filterStartups = () => {
    let filtered = startups;

    if (selectedFilters.futurescope.length > 0) {
      filtered = filtered.filter((startup) =>
        selectedFilters.futurescope.every((value) =>
          startup?.category?.futureScope?.includes(value)
        )
      );
    }
    if (selectedFilters.stage.length > 0) {
      filtered = filtered.filter((startup) =>
        selectedFilters.stage.every((value) =>
          startup?.category?.stages?.includes(value)
        )
      );
    }
    if (selectedFilters.program.length > 0) {
      filtered = filtered.filter((startup) =>
        selectedFilters.program.every((value) =>
          startup?.category?.programmes?.includes(value)
        )
      );
    }
    if (selectedFilters.grant.length > 0) {
      filtered = filtered.filter((startup) =>
        selectedFilters.grant.every((value) => startup?.grants?.includes(value))
      );
    }

    filteredStartups = filtered;
    currentPage = 1;
    renderStartups(filteredStartups);
  };

  document
    .getElementById("clearFuturescope")
    .addEventListener("click", function (event) {
      event.stopPropagation();
      selectedFilters.futurescope = [];
      document
        .querySelectorAll("#dropdownMenu1 .filter-item")
        .forEach((item) => {
          item.classList.remove("active");
        });
      filterStartups();
    });

  document
    .getElementById("clearStage")
    .addEventListener("click", function (event) {
      event.stopPropagation();
      selectedFilters.stage = [];
      document
        .querySelectorAll("#dropdownMenu2 .filter-item")
        .forEach((item) => {
          item.classList.remove("active");
        });
      filterStartups();
    });

  document
    .getElementById("clearProgram")
    .addEventListener("click", function (event) {
      event.stopPropagation();
      selectedFilters.program = [];
      document
        .querySelectorAll("#dropdownMenu3 .filter-item")
        .forEach((item) => {
          item.classList.remove("active");
        });
      filterStartups();
    });
  document
    .getElementById("clearGrant")
    .addEventListener("click", function (event) {
      event.stopPropagation();
      selectedFilters.grant = [];
      document
        .querySelectorAll("#dropdownMenu4 .filter-item")
        .forEach((item) => {
          item.classList.remove("active");
        });
      filterStartups();
    });

  const fetchDropdownTitles = () => {
    const programsGrantsAPI =
      "https://forgebackend.vercel.app/api/v1/startup/programs-grants";
    fetch(programsGrantsAPI)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const programmesDropdown = document.getElementById("dropdownMenu3");
        const grantsDropdown = document.getElementById("dropdownMenu4");

        if (programmesDropdown) {
          programmesDropdown.innerHTML =
            `<a href="#" class="filter-item" data-program="all">All </a>` +
            data?.data?.programmes
              ?.map((programme) => {
                return `<a href="#" class="filter-item" data-program="${programme}"
                  >${programme === "CiX" ? "Ci<sup>X</sup>" : programme}
                  </a>`;
              })
              .join("");
        }

        if (grantsDropdown) {
          grantsDropdown.innerHTML =
            `<a href="#" class="filter-item" data-grant="all">All </a>` +
            data?.data?.grants
              ?.map(
                (grant) =>
                  `<a href="#" class="filter-item" data-grant="${grant}"
                  >${grant}
                </a>`
              )
              .join("");
        }
      })
      .catch((error) => {
        console.error("Error fetching dropdown titles:", error);
      });
  };

  fetchDropdownTitles();

  function setupDropdown(selector, filterKey) {
    document.body.addEventListener("click", (e) => {
      const item = e.target.closest(`${selector} a`);
      if (!item) return;

      e.preventDefault();

      const value = item.dataset[filterKey];

      if (selectedFilters[filterKey].includes(value)) {
        selectedFilters[filterKey] = selectedFilters[filterKey].filter(
          (v) => v !== value
        );
        item.classList.remove("active");
      } else {
        selectedFilters[filterKey].push(value);
        item.classList.add("active");
      }
      updateClearButtonVisibility();
      filterStartups();
    });
  }

  setupDropdown("#dropdownMenu1", "futurescope");
  setupDropdown("#dropdownMenu2", "stage");
  setupDropdown("#dropdownMenu3", "program");
  setupDropdown("#dropdownMenu4", "grant");

  document.getElementById("startupsList").addEventListener("click", (event) => {
    const card = event.target.closest(".data-card");
    if (card) {
      const startupId = card.dataset.id;
      showStartupDetails(startupId);
    }
  });

  // Function to handle the dropdown toggle
  function handleDropdownToggle(dropdownId, defaultTitleId) {
    const dropdownMenu = document.getElementById(`dropdownMenu${dropdownId}`);
    const dropdownButton = document.getElementById(
      `dropdownButton${dropdownId}`
    );
    const dropdownTitle = document.getElementById(defaultTitleId);
    const defaultTitle = dropdownTitle?.dataset?.defaultText;

    // Initially set the dropdown to be visible
    dropdownMenu.style.display = "block";

    // Bind click event to the dropdown button
    dropdownButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the event from propagating to the document

      // Toggle the visibility of the current dropdown
      if (
        dropdownMenu.style.display === "none" ||
        dropdownMenu.style.display === ""
      ) {
        dropdownMenu.style.display = "block"; // Show the dropdown
      } else {
        dropdownMenu.style.display = "none"; // Hide the dropdown
      }
    });

    // Handle item selection inside the dropdown
    dropdownMenu.addEventListener("click", (e) => {
      const target = e.target;

      // Update the title with the selected filter item text
      if (dropdownTitle.textContent.trim() === target.textContent.trim()) {
        dropdownTitle.textContent = defaultTitle;
      } else if (target.classList.contains("filter-item")) {
        dropdownTitle.textContent = target.textContent;
      }

      // Close the dropdown after an item is selected
      dropdownMenu.style.display = "none";
    });

    // Close the dropdown when clicking outside
    document.addEventListener("click", (event) => {
      if (
        !event.target.closest(".dropdown") &&
        !dropdownMenu.contains(event.target) &&
        !dropdownTitle.contains(event.target)
      ) {
        dropdownMenu.style.display = "none";
      }
    });
  }

  // Call the function for each dropdown button
  handleDropdownToggle(1, "dropdownTitle1");
  handleDropdownToggle(2, "dropdownTitle2");
  handleDropdownToggle(3, "dropdownTitle3");
  handleDropdownToggle(4, "dropdownTitle4");

  const clearDropDownSelection = () => {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
      const dropdownTitle = dropdown.querySelector(`.dropdown-title`);
      if (dropdownTitle) {
        const defaultText = dropdownTitle.getAttribute("data-default-text");
        dropdownTitle.textContent = defaultText;
      }
    });
  };

  const clearFilters = () => {
    selectedFilters = {
      futurescope: [],
      stage: [],
      program: [],
      grant: [],
    };
    document.querySelectorAll(".filter-item").forEach((item) => {
      item.classList.remove("active");
    });
    filterStartups();
  };

  const clearFiltersBtn = document.getElementById("clearFiltersBtn");
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      clearFilters();
      clearDropDownSelection();
    });
  }
});

function showStartupDetails(startupId) {
  const modal = document.getElementById("modal");
  const apiUrl = `https://forgebackend.vercel.app/api/v1/startup/${startupId}`; // Replace with your API URL for a specific startup
  console.log(apiUrl);

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const startup = data.startup;
      console.log(startup);

      // Populate modal content
      const startupLogo = document.getElementById("startupLogo");
      if (startupLogo) startupLogo.src = startup?.logo?.url;

      const websiteUrl = document.getElementById("websiteUrl");
      if (websiteUrl) websiteUrl.href = startup?.websiteUrl || "#";

      const startupName = document.getElementById("startupName");
      if (startupName) startupName.textContent = startup?.name;

      const startupName2 = document.getElementById("startupName2");
      if (startupName2) startupName2.textContent = startup?.name;

      const hardwareTech = document.getElementById("hardwareTech");
      if (hardwareTech) hardwareTech.textContent = startup.hardwareTech || "";

      const hardwareInnovations = document.getElementById(
        "hardwareInnovations"
      );
      if (hardwareInnovations)
        hardwareInnovations.textContent = startup.hardwareInnovations || "";

      const about = document.getElementById("about");
      if (about) about.textContent = startup.about || "";

      // Key Investors
      const keyInvestorsList = document.getElementById("keyInvestors");
      if (keyInvestorsList) {
        keyInvestorsList.innerHTML = startup.keyInvestors.length
          ? startup.keyInvestors
              .map(
                (investor) => `<img
                  class="data-img-investor col-3 "
                  src="${investor?.url}"
                  alt="${"Investor logo"}"
                />`
              )
              .join("")
          : "<li>No key investors listed.</li>";
      }

      // Top Customers
      const customersList = document.getElementById("customersDetails");
      if (customersList) {
        customersList.innerHTML = startup.CustomersDetails.length
          ? startup.CustomersDetails.map(
              (customer) => `<img
                  class="data-img-investor col-3"
                  src="${customer?.url}"
                  alt="${"Customer logo"}"
                />`
            ).join("")
          : "<li>No top customers listed.</li>";
      }

      // Metric Features
      const metricFeaturesContainer = document.getElementById("metricFeatures");
      if (metricFeaturesContainer) {
        metricFeaturesContainer.innerHTML = startup.metricFeatures
          .map(
            (feature) => `
              <div class="row ">
              <div class="col-5 d-flex justify-content-center " >
              <img class="data-img" src="${feature?.icon?.url}" alt="${
              feature.heading || "Feature"
            }" />
              </div>
              <div class="col-6">
              <p class="m-0 feature-heading ">${feature.heading}</p>
              <p class="m-0 feature-metric ">${feature.metric}</p>
              </div>
              </div>
              `
          )
          .join("");
      }

      // Grants and Investors
      const grantsContainer = document.getElementById("grants");
      const programmesContainer = document.getElementById("programmes");
      const grantsInvestorsContainer =
        document.getElementById("GrantsInvestors");

      if (grantsContainer && programmesContainer && grantsInvestorsContainer) {
        const grantsContent = startup.grants.length
          ? startup.grants
              .map((grant) => `<p class="m-0 my-1">${grant}</p>`)
              .join("")
          : "<p>No grants listed.</p>";

        const programmesContent = startup.category.programmes.length
          ? startup.category.programmes
              .map((investor) => `<p class="m-0 my-1">${investor}</p>`)
              .join("")
          : "<p>No investors listed.</p>";

        grantsContainer.innerHTML = grantsContent;
        programmesContainer.innerHTML = programmesContent;

        if (!startup.grants.length && !startup.category.programmes.length) {
          grantsInvestorsContainer.style.display = "none";
        } else {
          grantsInvestorsContainer.style.display = "block";
        }
      }

      if (modal) {
        modal.style.display = "flex"; // Show modal
      }
    })
    .catch((error) => {
      console.error("Error fetching startup details:", error);
    });
}

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

document.getElementById("modal").addEventListener("click", (event) => {
  if (event.target === document.getElementById("modal")) {
    document.getElementById("modal").style.display = "none";
  }
});
