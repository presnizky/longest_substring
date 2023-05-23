"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
function findLongestAdjacentString(stringArray) {
    let longestString = [];
    const numRows = stringArray.length;
    const numCols = stringArray[0].length;
    // Helper function to check if coordinates are within bounds
    const isValidIndex = (row, col) => {
        return row >= 0 && row < numRows && col >= 0 && col < numCols;
    };
    // Helper function to get the longest string from a given direction
    const getLongestString = (startRow, startCol, dRow, dCol) => {
        let currentRow = startRow;
        let currentCol = startCol;
        const currentChar = stringArray[currentRow][currentCol];
        let currentString = [currentChar];
        while (isValidIndex(currentRow + dRow, currentCol + dCol)) {
            currentRow += dRow;
            currentCol += dCol;
            const nextChar = stringArray[currentRow][currentCol];
            if (nextChar === currentChar) {
                currentString.push(nextChar);
            }
            else {
                break;
            }
        }
        return currentString;
    };
    // Iterate over each element in the array and check all directions
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const directions = [
                [0, 1],
                [1, 0],
                [1, 1],
                [1, -1], // Diagonal down-left
            ];
            for (const [dRow, dCol] of directions) {
                const adjacentString = getLongestString(row, col, dRow, dCol);
                if (adjacentString.length > longestString.length) {
                    longestString = adjacentString;
                }
            }
        }
    }
    return longestString;
}
// Read input from standard input
const readline = __importStar(require("readline"));
console.log('*************************');
console.log('Instructions: ');
console.log('*************************');
console.log('Enter your matrix information one line at a time, and separate each character with a comma (`,`).');
console.log('After writing all the elements in a line, hit `Enter` to move to the next line.');
console.log('Once all the lines are entered, hit CTRL+C to break the input and process the matrix.');
console.log();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const stringArray = [];
// Read each line of input and populate the string array
rl.on('line', (line) => {
    const row = line.trim().split(',').map((char) => char.trim());
    stringArray.push(row);
});
// Process the input once all lines have been read
rl.on('close', () => {
    const longestString = findLongestAdjacentString(stringArray);
    console.log('Longest adjacent string:', longestString);
});
