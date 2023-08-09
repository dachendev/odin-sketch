// create a 16x16 grid of square divs
function createGrid({ parent } = {}) {
  const container = document.createElement("div");
  container.classList.add("grid");

  for (let y = 0; y < 16; y++) {
    const row = document.createElement("div");
    row.classList.add("grid-row");

    for (let x = 0; x < 16; x++) {
      const item = document.createElement("div");
      item.classList.add("grid-item");

      row.append(item);
    }

    container.append(row);
  }

  parent.append(container);
}

createGrid({ parent: document.getElementById("root") });

// hover effect
function handleMouseEnter(e) {
  e.target.classList.add("painted");
}

document.querySelectorAll(".grid-item")
  .forEach((item) => item.addEventListener("mouseenter", handleMouseEnter));