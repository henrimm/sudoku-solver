export let emptyGridObject = {
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

export const smallerGridCenters = [
    22, 25, 28,
    52, 55, 58,
    82, 85, 88
]

export const smallerGridCenterOffsets = [
    -11, -10, -9,
    -1, 0, +1,
    +9, +10, +11
]

export function calculateSmallerGrids(gridObject, centers, offsets) {
    let solvedGrids = new Array(9);
    for (let i = 0; i < 9; i++) {
        let total = 0;
        for (let j = 0; j < 9; j++) {
            total += Number(gridObject[centers[i]-offsets[j]].value);
        }
        solvedGrids[i] = (total == 45 ? true : false);
    }
    console.log(solvedGrids);
}

function calculateColumns(gridObject) {
    let solvedColumns = new Array(9);
    for (let i = 1; i < 10; i++) {
        let total = 0;
        for (let j = 1; j < 10; j++) {
            total += Number(gridObject[Number(j.toString() + i.toString())].value);
        }
        solvedColumns[i - 1] = (total == 45 ? true : false);
    }
    console.log(solvedColumns);
}

function calculateRows(gridObject) {
    let solvedRows = new Array(9);
    for (let i = 1; i < 10; i++) {
        let total = 0;
        for (let j = 1; j < 10; j++) {
            total += Number(gridObject[Number(i.toString() + j.toString())].value);
        }
        solvedRows[i - 1] = (total == 45 ? true : false);
    }
    console.log(solvedRows);
}

export function getValues(gridObject) {
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