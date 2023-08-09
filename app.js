// create a 16x16 grid of square divs
const gridContainer = document.getElementById("gridContainer");

// hover effect
function paint(e) {
  e.target.classList.add("painted");
}

function createGrid({ parent, size } = {}) {
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

createGrid({ parent: gridContainer, size: 16 });

// button to resize grid
const resizeButton = document.getElementById("resizeButton");
const maxSize = 100;

function resizeGrid(e) {
  const size = prompt("Enter a new grid size.");

  // destroy current grid
  gridContainer.innerText = "";

  createGrid({ parent: gridContainer, size: size });
}

resizeButton.addEventListener("click", resizeGrid);