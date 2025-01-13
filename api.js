// document.addEventListener("DOMContentLoaded", () => {
//   const apiUrl = "https://forgebackend.vercel.app/api/v1/startup"; // Replace with your API URL

//   // Fetch all startups
//   fetch(apiUrl)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       const startups = data.startups; // Assuming the response has a `startups` array
//       const startupsList = document.getElementById("startupsList");
//       // console.log(startups);

//       // Render the startups list
//       startupsList.innerHTML = startups
//         .map(
//           (startup) => `
//           <div data-id="${startup._id}" onclick="showStartupDetails(${
//             startup._id
//           })" class="data-card px-3 col-12 col-md-6 col-lg-4">
//             <img
//               class="data-img"
//               src="${startup?.logo?.url}"
//               alt="${startup?.name || "No Logo"}"
//             />
//             <p class="data-header m-0">${startup.name}</p>
//             <span class="data-desc"
//               >${startup.about}</span
//             >
//           </div>
//           `
//         )
//         .join("");
//       startupsList.addEventListener("click", (event) => {
//         const card = event.target.closest(".data-card");
//         if (card) {
//           const startupId = card.dataset.id;
//           showStartupDetails(startupId);
//         }
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching startups:", error);
//     });
// });

// Show startup details in the modal
// function showStartupDetails(startupId) {
//   const modal = document.getElementById("modal");
//   const apiUrl = `https://forgebackend.vercel.app/api/v1/startup/${startupId}`; // Replace with your API URL for a specific startup
//   console.log(apiUrl);

//   fetch(apiUrl)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       const startup = data.startup;

//       // Populate modal content
//       document.getElementById("startupLogo").src = startup?.logo?.url;
//       document.getElementById("websiteUrl").href = startup?.websiteUrl;
//       document.getElementById("startupName").textContent = startup?.name;
//       document.getElementById("startupName2").textContent = startup?.name;
//       document.getElementById("websiteUrl").href = startup.websiteUrl || "#";
//       document.getElementById("hardwareTech").textContent =
//         startup.hardwareTech || "";
//       document.getElementById("hardwareInnovations").textContent =
//         startup.hardwareInnovations || "";
//       document.getElementById("about").textContent = startup.about || "";

//       // Key Investors
//       const keyInvestorsList = document.getElementById("keyInvestors");
//       keyInvestorsList.innerHTML = startup.keyInvestors.length
//         ? startup.keyInvestors
//             .map(
//               (investor) => `<img
//               class="data-img"
//               src="${investor?.url}"
//               alt="${"Investor logo"}"
//             />`
//             )
//             .join("")
//         : "<li>No key investors listed.</li>";

//       // Top Customers
//       const customersList = document.getElementById("customersDetails");
//       customersList.innerHTML = startup.CustomersDetails.length
//         ? startup.CustomersDetails.map(
//             (customer) => `<img
//               class="data-img"
//               src="${customer?.url}"
//               alt="${"Customer logo"}"
//             />`
//           ).join("")
//         : "<li>No top customers listed.</li>";

//       // Metric Features
//       const metricFeaturesContainer = document.getElementById("metricFeatures");
//       metricFeaturesContainer.innerHTML = startup.metricFeatures
//         .map(
//           (feature) => `

//           <div class="row ">
//           <div class="col-5" >
//           <img class="data-img" src="${feature?.icon?.url}" alt="${
//             feature.heading || "Feature"
//           }" />
//           </div>
//           <div class="col-6">
//           <p class="m-0 feature-heading ">${feature.heading}</p>
//           <p class="m-0 feature-metric ">${feature.metric}</p>
//           </div>
//           </div>
//           `
//         )
//         .join("");

//       // Category Details
//       // const categoryContainer = document.getElementById("category");
//       // categoryContainer.innerHTML = startup.category
//       //   .map(
//       //     (cat) => `
//       //     <div>
//       //       <h6>Future Scope: ${cat.futureScope}</h6>
//       //       <p>Stage: ${cat.stages}</p>
//       //       <p>Programmes: ${cat.programmes}</p>
//       //     </div>`
//       //   )
//       //   .join("");

//       modal.style.display = "flex"; // Show modal
//     })
//     .catch((error) => {
//       console.error("Error fetching startup details:", error);
//     });
// }

// // Modal close logic
// document.getElementById("closeModal").addEventListener("click", () => {
//   document.getElementById("modal").style.display = "none";
// });

//filter
document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://forgebackend.vercel.app/api/v1/startup"; // Replace with your API URL
  const loader = document.getElementById("loader");
  let startups = [];
  let selectedFilters = {
    futurescope: null,
    stage: null,
    program: null,
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
    console.log(filteredStartups);
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
    console.log(filtered);
    console.log(selectedFilters.futurescope);

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
    console.log(filtered);

    renderStartups(filtered);
  };

  // Event listeners for dropdown menu items
  document.querySelectorAll("#dropdownMenu1 a").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      selectedFilters.futurescope = item.dataset.futurescope;
      filterStartups();
    });
  });

  document.querySelectorAll("#dropdownMenu2 a").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      selectedFilters.stage = item.dataset.stage;
      filterStartups();
    });
  });

  document.querySelectorAll("#dropdownMenu3 a").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      selectedFilters.program = item.dataset.program;
      filterStartups();
    });
  });
  startupsList.addEventListener("click", (event) => {
    const card = event.target.closest(".data-card");
    if (card) {
      const startupId = card.dataset.id;
      showStartupDetails(startupId);
    }
  });
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

      // Populate modal content
      document.getElementById("startupLogo").src = startup?.logo?.url;
      document.getElementById("websiteUrl").href = startup?.websiteUrl;
      document.getElementById("startupName").textContent = startup?.name;
      document.getElementById("startupName2").textContent = startup?.name;
      document.getElementById("websiteUrl").href = startup.websiteUrl || "#";
      document.getElementById("hardwareTech").textContent =
        startup.hardwareTech || "";
      document.getElementById("hardwareInnovations").textContent =
        startup.hardwareInnovations || "";
      document.getElementById("about").textContent = startup.about || "";

      // Key Investors
      const keyInvestorsList = document.getElementById("keyInvestors");
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

      // Top Customers
      const customersList = document.getElementById("customersDetails");
      customersList.innerHTML = startup.CustomersDetails.length
        ? startup.CustomersDetails.map(
            (customer) => `<img
              class="data-img-investor col-3"
              src="${customer?.url}"
              alt="${"Customer logo"}"
            />`
          ).join("")
        : "<li>No top customers listed.</li>";

      // Metric Features
      const metricFeaturesContainer = document.getElementById("metricFeatures");
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

      // Category Details
      // const categoryContainer = document.getElementById("category");
      // categoryContainer.innerHTML = startup.category
      //   .map(
      //     (cat) => `
      //     <div>
      //       <h6>Future Scope: ${cat.futureScope}</h6>
      //       <p>Stage: ${cat.stages}</p>
      //       <p>Programmes: ${cat.programmes}</p>
      //     </div>`
      //   )
      //   .join("");

      modal.style.display = "flex"; // Show modal
    })
    .catch((error) => {
      console.error("Error fetching startup details:", error);
    });
}

// Modal close logic
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

document.getElementById("modal").addEventListener("click", (event) => {
  if (event.target === document.getElementById("modal")) {
    document.getElementById("modal").style.display = "none";
  }
});
