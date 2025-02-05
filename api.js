//filter
document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://forgebackend.vercel.app/api/v1/startup"; // Replace with your API URL
  const loader = document.getElementById("loader");
  let startups = [];
  let selectedFilters = {
    futurescope: null,
    stage: null,
    program: null,
    grant: null,
  };

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
        renderStartups(startups);
        hideLoader();
      })
      .catch((error) => {
        console.error("Error fetching startups:", error);
        hideLoader();
      });
  };

  fetchStartups();
  // Function to render startups
  const renderStartups = (filteredStartups) => {
    const startupsList = document.getElementById("startupsList");
    const activeStartups = filteredStartups.filter(
      (startup) => startup.status == "Active"
    );
    startupsList.innerHTML = activeStartups
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
  };

  // Function to filter startups
  const filterStartups = () => {
    let filtered = startups;

    if (selectedFilters.futurescope) {
      filtered = filtered.filter((startup) => {
        return startup?.category?.futureScope?.includes(
          selectedFilters.futurescope
        );
      });
    }
    if (selectedFilters.stage) {
      filtered = filtered.filter((startup) => {
        return startup?.category?.stages?.includes(selectedFilters.stage);
      });
    }
    if (selectedFilters.program) {
      filtered = filtered.filter((startup) => {
        return startup?.category?.programmes?.includes(selectedFilters.program);
      });
    }
    if (selectedFilters.grant) {
      filtered = filtered.filter((startup) => {
        return startup?.grants?.includes(selectedFilters.grant);
      });
    }

    renderStartups(filtered);
  };

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
          programmesDropdown.innerHTML = data?.data?.programmes
            ?.map(
              (programme) =>
                `<a href="#" class="filter-item" data-program="${programme}"
                >${programme}
              </a>`
            )
            .join("");
        }

        if (grantsDropdown) {
          grantsDropdown.innerHTML = data?.data?.grants
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

  // document.querySelectorAll("#dropdownMenu1 a").forEach((item) => {
  //   item.addEventListener("click", (e) => {
  //     e.preventDefault();

  //     // Deselect all other items in the same filter category
  //     document.querySelectorAll("#dropdownMenu1 a").forEach((el) => {
  //       el.classList.remove("active");
  //     });

  //     const futurescope = item.dataset.futurescope;

  //     // If it's the same filter, deselect it; otherwise, select the new one
  //     if (selectedFilters.futurescope === futurescope) {
  //       selectedFilters.futurescope = null;
  //     } else {
  //       selectedFilters.futurescope = futurescope;
  //       item.classList.add("active");
  //     }

  //     filterStartups();
  //   });
  // });

  // document.querySelectorAll("#dropdownMenu2 a").forEach((item) => {
  //   item.addEventListener("click", (e) => {
  //     e.preventDefault();

  //     // Deselect all other items in the same filter category
  //     document.querySelectorAll("#dropdownMenu2 a").forEach((el) => {
  //       el.classList.remove("active");
  //     });

  //     const stage = item.dataset.stage;

  //     // If it's the same filter, deselect it; otherwise, select the new one
  //     if (selectedFilters.stage === stage) {
  //       selectedFilters.stage = null;
  //     } else {
  //       selectedFilters.stage = stage;
  //       item.classList.add("active");
  //     }

  //     filterStartups();
  //   });
  // });

  // document.querySelectorAll("#dropdownMenu3 a").forEach((item) => {
  //   item.addEventListener("click", (e) => {
  //     e.preventDefault();

  //     // Deselect all other items in the same filter category
  //     document.querySelectorAll("#dropdownMenu3 a").forEach((el) => {
  //       el.classList.remove("active");
  //     });

  //     const program = item.dataset.program;

  //     // If it's the same filter, deselect it; otherwise, select the new one
  //     if (selectedFilters.program === program) {
  //       selectedFilters.program = null;
  //     } else {
  //       selectedFilters.program = program;
  //       item.classList.add("active");
  //     }

  //     filterStartups();
  //   });
  // });

  // document.querySelectorAll("#dropdownMenu4 a").forEach((item) => {
  //   item.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     // Deselect all other items in the same filter category
  //     document.querySelectorAll("#dropdownMenu4 a").forEach((el) => {
  //       el.classList.remove("active");
  //     });

  //     const grant = item.dataset.grant;

  //     // If it's the same filter, deselect it; otherwise, select the new one
  //     if (selectedFilters.grant === grant) {
  //       selectedFilters.grant = null;
  //     } else {
  //       selectedFilters.grant = grant;
  //       item.classList.add("active");
  //     }

  //     filterStartups();
  //   });
  // });

  function setupDropdown(selector, filterKey) {
    document.body.addEventListener("click", (e) => {
      const item = e.target.closest(`${selector} a`);
      if (!item) return;

      e.preventDefault();

      // Deselect all other items in the same filter category
      document.querySelectorAll(`${selector} a`).forEach((el) => {
        el.classList.remove("active");
      });

      const value = item.dataset[filterKey];

      // If it's the same filter, deselect it; otherwise, select the new one
      if (selectedFilters[filterKey] === value) {
        selectedFilters[filterKey] = null;
      } else {
        selectedFilters[filterKey] = value;
        item.classList.add("active");
      }

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

  // const handleDropdownSelection = (dropdownId, defaultTitleId) => {
  //   const dropdownMenu = document.getElementById(`dropdownMenu${dropdownId}`);
  //   const dropdownTitle = document.getElementById(`${defaultTitleId}`);
  //   console.log(dropdownMenu);
  //   const defaultTitle = dropdownTitle?.textContent?.trim();
  //   dropdownMenu.addEventListener("click", (event) => {
  //     const target = event.target;
  //     if (dropdownTitle.textContent.trim() === target.textContent.trim()) {
  //       dropdownTitle.textContent = defaultTitle;
  //     } else if (target.classList.contains("filter-item")) {
  //       dropdownTitle.textContent = target.textContent;
  //     }
  //   });

  //   document.addEventListener("click", (event) => {
  //     if (
  //       !dropdownMenu.contains(event.target) &&
  //       !dropdownTitle.contains(event.target)
  //     ) {
  //       dropdownMenu.style.display = "none";
  //     } else {
  //       dropdownMenu.style.display = "block";
  //     }
  //   });
  // };

  let openDropdown = null;

  // const handleDropdownSelection = (dropdownId, defaultTitleId) => {
  //   const dropdownMenu = document.getElementById(`dropdownMenu${dropdownId}`);
  //   const dropdownTitle = document.getElementById(defaultTitleId);
  //   const dropdownButton = document.getElementById(
  //     `dropdownButton${dropdownId}`
  //   );
  //   const defaultTitle = dropdownTitle?.dataset?.defaultText;
  //   // Toggle menu on button click
  //   dropdownButton.addEventListener("click", (e) => {
  //     e.stopPropagation();
  //     const target = e.target;
  //     // console.log(target);
  //     // console.log(dropdownTitle);
  //     // console.log(dropdownButton);
  //     // if (!dropdownButton.contains(target)) {
  //     //   dropdownMenu.style.display = "none";
  //     // } else {
  //     //   console.log(dropdownMenu);
  //     // }
  //     dropdownMenu.style.display = "block";
  //   });

  //   // Handle item selection
  //   dropdownMenu.addEventListener("click", (e) => {
  //     const target = e.target;

  //     if (dropdownTitle.textContent.trim() === target.textContent.trim()) {
  //       dropdownTitle.textContent = defaultTitle;
  //     } else if (target.classList.contains("filter-item")) {
  //       dropdownTitle.textContent = target.textContent;
  //     }
  //   });

  //   // Close when clicking outside
  //   document.addEventListener("click", (event) => {
  //     if (
  //       !event.target.closest(".dropdown") &&
  //       !dropdownMenu.contains(event.target) &&
  //       !dropdownTitle.contains(event.target)
  //     ) {
  //       console.log(dropdownTitle);
  //       dropdownMenu.style.display = "none";
  //     }
  //   });
  // };

  const handleDropdownSelection = (dropdownId, defaultTitleId) => {
    const dropdownMenu = document.getElementById(`dropdownMenu${dropdownId}`);
    const dropdownTitle = document.getElementById(defaultTitleId);
    const dropdownButton = document.getElementById(
      `dropdownButton${dropdownId}`
    );
    const defaultTitle = dropdownTitle?.dataset?.defaultText;

    // Toggle menu on button click
    dropdownButton.addEventListener("click", (e) => {
      e.stopPropagation();

      // Close the previously open dropdown
      if (openDropdown && openDropdown !== dropdownMenu) {
        openDropdown.style.display = "none";
      }

      // Toggle the current dropdown
      if (dropdownMenu.style.display === "block") {
        dropdownMenu.style.display = "none";
        openDropdown = null;
      } else {
        dropdownMenu.style.display = "block";
        openDropdown = dropdownMenu;
      }
    });

    // Handle item selection
    dropdownMenu.addEventListener("click", (e) => {
      const target = e.target;
      if (dropdownTitle.textContent.trim() === target.textContent.trim()) {
        dropdownTitle.textContent = defaultTitle;
      } else if (target.classList.contains("filter-item")) {
        dropdownTitle.textContent = target.textContent;
      }
      dropdownMenu.style.display = "none"; // Close dropdown after selection
      openDropdown = null;
    });

    // Close when clicking outside
    document.addEventListener("click", (event) => {
      if (
        openDropdown &&
        !event.target.closest(".dropdown") &&
        !dropdownMenu.contains(event.target) &&
        !dropdownTitle.contains(event.target)
      ) {
        dropdownMenu.style.display = "none";
        openDropdown = null;
      }
    });
  };

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

  handleDropdownSelection(1, "dropdown-title1");
  handleDropdownSelection(2, "dropdown-title2");
  handleDropdownSelection(3, "dropdown-title3");
  handleDropdownSelection(4, "dropdown-title4");

  const clearFilters = () => {
    selectedFilters = {
      futurescope: null,
      stage: null,
      program: null,
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
