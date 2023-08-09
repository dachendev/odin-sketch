// track if mouse is clicked for better drawing
let mouseDown = false;

document.body.addEventListener("mousedown", function (e) {
  mouseDown = true;
});

document.body.addEventListener("mouseup", function (e) {
  mouseDown = false;
});

// create a 16x16 grid of square divs
const gridContainer = document.getElementById('gridContainer');

// hover effect
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor() {
  const r = randomInt(0, 255);
  const g = randomInt(0, 255);
  const b = randomInt(0, 255);

  return `${r}, ${g}, ${b}`;
}

function paint(e) {
  const item = e.target;

  if (!item.dataset.color) {
    item.dataset.color = randomColor();
  }

  if (!item.dataset.alpha) {
    item.dataset.alpha = "0";
  }

  let alpha = parseFloat(item.dataset.alpha);

  if (alpha < 1) {
    // increment by 10%
    alpha = alpha + 0.1;
    item.dataset.alpha = alpha.toFixed(1);
  }

  item.style.backgroundColor = `rgb(${item.dataset.color}, ${item.dataset.alpha})`;
}

function createGrid(parent, options = {}) {
  const size = options.size || 16;

  const container = document.createElement('div');
  container.classList.add('grid');

  for (let y = 0; y < size; y++) {
    const row = document.createElement('div');
    row.classList.add('grid-row');

    for (let x = 0; x < size; x++) {
      const item = document.createElement('div');
      item.classList.add('grid-item');

      item.addEventListener('mousedown', paint);
      item.addEventListener('mouseenter', function (e) {
        // only paint if the mouse is down
        if (mouseDown) {
          paint(e);
        }
      });

      row.append(item);
    }

    container.append(row);
  }

  parent.append(container);
}

createGrid(gridContainer);

// helper fn to prompt and validate numeric input
function promptNumeric(message, options = {}) {
  const defaultValue = options.defaultValue || '';
  const min = options.min;
  const max = options.max;

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

    if (n == '') {
      error = 'Input cannot be empty';
      continue;
    }

    n = parseInt(n, 10);

    if (isNaN(n)) {
      // not a number
      error = 'Not a number';
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
const resizeButton = document.getElementById('resizeButton');
const maxSize = 100;

function resizeGrid(e) {
  // ask user for size
  const size = promptNumeric(`Enter a number from 0 to ${maxSize}.`, {
    min: 0,
    max: maxSize,
  });

  if (!size) {
    return; // cancel
  }

  // destroy current grid
  gridContainer.innerText = '';

  createGrid(gridContainer, { size });
}

resizeButton.addEventListener('click', resizeGrid);