const grid = document.getElementById("grid");

function createGrid(grid) {
    const box = document.createElement("div");
    box.setAttribute("class", "box");
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let newBox = box.cloneNode();
            newBox.setAttribute("id", i.toString() + j.toString());
            if (i == 0 || i == 3 || i == 6) {
                newBox.classList.add("border-top");
            } else if (i == 8) {
                newBox.classList.add("border-bottom");
            }
            if (j == 2 || j == 5 || j == 8) {
                newBox.classList.add("border-right");
            } else if (j == 0) {
                newBox.classList.add("border-left");
            }
            grid.appendChild(newBox);
            console.log(i.toString() + j.toString());
        }
    }
}

createGrid(grid);