const words = [
  "activate",
  "prototype",
  "fund",
  "commercialise",
  "accelerate",
  "invest",
  "scale",
];

let index = 0;
const dynamicTextElement = document.querySelector(".dynamic-text");

function changeWord() {
  dynamicTextElement.textContent = words[index];
  index = (index + 1) % words.length;
}

changeWord();

setInterval(changeWord, 2000);
