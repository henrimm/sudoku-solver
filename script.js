// Get the grid element on the page
const grid = document.getElementById("grid");
let completeGrid = {};
let a1 = [], a2 = [], a3 = [];
let b1 = [], b2 = [], b3 = [];
let c1 = [], c2 = [], c3 = [];

// This function needs to be defined in this way so we can remove the event listener later if necessary
const sliceInput = function() {
    if (this.value.length > 0) {
        this.value = this.value.slice(1);
    }
}
function createGrid(grid) {
    // Create the main box element that is then copied and modified according to its position
    let box = document.createElement("div");
    box.setAttribute("class", "box");
    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("class", "number-input");
    box.append(input);

    // console.log(box.childNodes);

    // Copy and add the box elements to their positions on the grid
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            let newBox = box.cloneNode(true);
            // Add id to the box and the input elements that represent their position on the grid
            let xCoord = i.toString(), yCoord = j.toString();
            newBox.setAttribute("id", xCoord + yCoord);
            let newInput = newBox.querySelector(".number-input");
            newInput.setAttribute("id", newBox.id.toString() + "-input");

            // Add minimum and maximum values to number input fields. This also lets you use scroll to choose the numbers without going below 0 or above 9.
            newInput.setAttribute("min", "0");
            newInput.setAttribute("max", "9");
            newInput.addEventListener("keypress", sliceInput);

            newInput.addEventListener("blur", function() {
                // This might look really stupid, but number inputs return an empty string if it contains any characters that aren't numbers
                // So if the input contains invalid characters, this will clear the input field
                // And if the input is actually empty, it will stay empty
                if (this.value == "") {
                    this.value = "";
                } else if (this.value.length > 1) {
                    this.value = this.value[0];
                }
            });

            // Check if we need to add a thicker border to the box to make the grid look like it should
            // 1st, 4th and 7th row
            if (i == 1 || i == 4 || i == 7) {
                newBox.classList.add("border-top");
            }
            // Last row - add thicker bottom border
            else if (i == 9) {
                newBox.classList.add("border-bottom");
            }
            // 3rd, 6th and 9th column
            if (j == 3 || j == 6 || j == 9) {
                newBox.classList.add("border-right");
            }
            // First column - add thicker left border
            else if (j == 1) {
                newBox.classList.add("border-left");
            }

            completeGrid[xCoord + yCoord] = newInput;

            grid.appendChild(newBox);
        }
    }
}

// Create the grid
createGrid(grid);

const solveButton = document.getElementById("solve");
solveButton.addEventListener("click", function() {
    solve(completeGrid);
});

// Solver
let emptyGridObject = {
    11: null, 12: null, 13: null, 14: null, 15: null, 16: null, 17: null, 18: null, 19: null,
    21: null, 22: null, 23: null, 24: null, 25: null, 26: null, 27: null, 28: null, 29: null,
    31: null, 32: null, 33: null, 34: null, 35: null, 36: null, 37: null, 38: null, 39: null,
    41: null, 42: null, 43: null, 44: null, 45: null, 46: null, 47: null, 48: null, 49: null,
    51: null, 52: null, 53: null, 54: null, 55: null, 56: null, 57: null, 58: null, 59: null,
    61: null, 62: null, 63: null, 64: null, 65: null, 66: null, 67: null, 68: null, 69: null,
    71: null, 72: null, 73: null, 74: null, 75: null, 76: null, 77: null, 78: null, 79: null,
    81: null, 82: null, 83: null, 84: null, 85: null, 86: null, 87: null, 88: null, 89: null,
    91: null, 92: null, 93: null, 94: null, 95: null, 96: null, 97: null, 98: null, 99: null
}

const smallerGridCenters = [
    22, 25, 28,
    52, 55, 58,
    82, 85, 88
]

const smallerGridCenterOffsets = [
    -11, -10, -9,
    -1, 0, +1,
    +9, +10, +11
]

function calculateSmallerGrids(gridObject, centers, offsets) {
    let solvedGrids = new Array(9);
    for (let i = 0; i < 9; i++) {
        let currentGrid = new Array(9);
        for (let j = 0; j < 9; j++) {
            currentGrid[j] = Number(gridObject[centers[i]-offsets[j]].value);
        }
        let check = new Set(currentGrid);
        solvedGrids[i] = (check.size == currentGrid.length ? true : false);
    }
    console.log(solvedGrids);
}

function calculateColumns(gridObject) {
    let solvedColumns = new Array(9);
    for (let i = 1; i < 10; i++) {
        let currentColumn = new Array(9);
        for (let j = 1; j < 10; j++) {
            currentColumn[j - 1] = Number(gridObject[Number(j.toString() + i.toString())].value);
        }
        let check = new Set(currentColumn);
        solvedColumns[i - 1] = (check.size == currentColumn.length ? true : false);
    }
    console.log(solvedColumns);
}

function calculateRows(gridObject) {
    let solvedRows = new Array(9);
    for (let i = 1; i < 10; i++) {
        let currentRow = new Array(9);
        for (let j = 1; j < 10; j++) {
            currentRow[j - 1] = Number(gridObject[Number(i.toString() + j.toString())].value);
        }
        let check = new Set(currentRow);
        solvedRows[i - 1] = (check.size == currentRow.length ? true : false);
    }
    console.log(solvedRows);
}

function solve(gridObject) {
    let values = getValues(gridObject);
    calculateSmallerGrids(gridObject, smallerGridCenters, smallerGridCenterOffsets);
    calculateColumns(gridObject);
    calculateRows(gridObject);
}

function solver(gridObject) {
    let currentGrid = getValues(gridObject);
}

let hard = {
    11: null, 12: 3, 13: null, 14: 4, 15: 8, 16: null, 17: 6, 18: null, 19: 9,
    21: null, 22: null, 23: null, 24: null, 25: 2, 26: 7, 27: null, 28: null, 29: null,
    31: 8, 32: null, 33: null, 34: 3, 35: null, 36: null, 37: null, 38: null, 39: null,
    41: null, 42: 1, 43: 9, 44: null, 45: null, 46: null, 47: null, 48: null, 49: null,
    51: 7, 52: 8, 53: null, 54: null, 55: null, 56: 2, 57: null, 58: 9, 59: 3,
    61: null, 62: null, 63: null, 64: null, 65: null, 66: 4, 67: 8, 68: 7, 69: null,
    71: null, 72: null, 73: null, 74: null, 75: null, 76: 5, 77: null, 78: null, 79: 6,
    81: null, 82: null, 83: null, 84: 1, 85: 3, 86: null, 87: null, 88: null, 89: null,
    91: 9, 92: null, 93: 2, 94: null, 95: 4, 96: 8, 97: null, 98: 1, 99: null
}

const addNumbersButton = document.getElementById("add-numbers");
addNumbersButton.addEventListener("click", function() {
    addNumbers(completeGrid, hard);
})

function addNumbers(gridObject, numbers) {
    let numberElement = document.createElement("p");
    numberElement.classList.add("number");
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            if (numbers[i.toString() + j.toString()] != null) {
                let coordinates = i.toString() + j.toString();
                gridObject[coordinates].removeEventListener("keypress", sliceInput);
                gridObject[coordinates].classList.add("number-set");
                gridObject[coordinates].value = numbers[coordinates];
                gridObject[coordinates].readOnly = true;
            }
        }
    }
}

function getValues(gridObject) {
    let copiedValues = new Object;
    let gridValues = Object.assign(copiedValues, emptyGridObject);
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            let coordinates = Number(i.toString() + j.toString());
            gridValues[coordinates] = Number(gridObject[coordinates].value);
        }
    }
    return gridValues;
}

const fillGridButton = document.getElementById("fill-grid");
fillGridButton.addEventListener("click", function() {
    debugFillGrid(completeGrid);
});

function debugFillGrid(gridObject) {
    let num = 0;
    for (let i = 11; i < 100; i++) {
        if (i % 10 == 0) {
            continue;
        } else {
            if (num < 9) {
                num++;
            } else {
                num = 1;
            }
            completeGrid[i].value = num;
        }
    }
}