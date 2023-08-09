// create a 16x16 grid of square divs
const gridContainer = document.getElementById("gridContainer");

// hover effect
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor(alpha = 1) {
  const r = randomInt(0, 255);
  const g = randomInt(0, 255);
  const b = randomInt(0, 255);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function paint(e) {
  const item = e.target;
  item.style.backgroundColor = randomColor();
}

function createGrid({ parent, size = 16 }) {
  const container = document.createElement("div");
  container.classList.add("grid");

  for (let y = 0; y < size; y++) {
    const row = document.createElement("div");
    row.classList.add("grid-row");

    for (let x = 0; x < size; x++) {
      const item = document.createElement("div");
      item.classList.add("grid-item");
      item.addEventListener("mouseenter", paint);

      row.append(item);
    }

    container.append(row);
  }

  parent.append(container);
}

createGrid({ parent: gridContainer });

// helper fn to prompt and validate numeric input
function promptNumeric({
  message,
  defaultValue = "",
  min = null,
  max = null,
}) {
  let n;
  let error;

  while (true) {
    if (error) {
      n = prompt(`${message}\nError: ${error}`, defaultValue);
    } else {
      n = prompt(message, defaultValue);
    }

    if (!n) {
      break; // cancel prompt
    }

    if (n == "") {
      error = "Input cannot be empty";
      continue;
    }

    n = parseInt(n, 10);

    if (isNaN(n)) {
      // not a number
      error = "Not a number";
      continue;
    }

    if (min && n < min) {
      // less than min
      error = `Number cannot be less than ${min}`;
      continue;
    }

    if (max && n > max) {
      // greater than max
      error = `Number cannot be greater than ${max}`;
      continue;
    }

    break;
  }

  return n;
}

// button to resize grid
const resizeButton = document.getElementById("resizeButton");
const maxSize = 100;

function resizeGrid(e) {
  // ask user for size
  const size = promptNumeric({
    message: `Enter a number from 0 to ${maxSize}.`,
    min: 0,
    max: 100,
  });

  if (!size) {
    return;
  }

  // destroy current grid
  gridContainer.innerText = "";

  createGrid({ parent: gridContainer, size: size });
}

resizeButton.addEventListener("click", resizeGrid);