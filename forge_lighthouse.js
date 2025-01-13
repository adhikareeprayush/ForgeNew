const tabs = document.querySelectorAll(".new-tab-card");
const innerTab2 = document.getElementsByClassName("inner-tab-2")[0];
const contents = document.querySelectorAll(".new-tab-content");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    contents.forEach((c) => c.classList.add("d-none"));

    tab.classList.add("active");

    document
      .getElementById(tab.getAttribute("data-tab"))
      .classList.remove("d-none");
    if (index === 1 && innerTab2) {
      innerTab2.style.backgroundColor = "black"; // Apply black background to innerTab2
    } else if (innerTab2) {
      innerTab2.style.backgroundColor = ""; // Reset background color for other tabs
    }
  });
});
