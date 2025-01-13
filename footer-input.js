const input = document.getElementById("footer-input");
const targetDiv = document.getElementById("footer-input-container");

input.addEventListener("click", () => {
  targetDiv.classList.add("focused");
});

input.addEventListener("blur", () => {
  targetDiv.classList.remove("focused");
});
