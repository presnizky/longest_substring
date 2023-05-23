function findLongestAdjacentString(stringArray: string[][]): string[] {
  let longestString: string[] = [];
  const numRows = stringArray.length;
  const numCols = stringArray[0].length;

  // Helper function to check if coordinates are within bounds
  const isValidIndex = (row: number, col: number): boolean => {
    return row >= 0 && row < numRows && col >= 0 && col < numCols;
  };

  // Helper function to get the longest string from a given direction
  const getLongestString = (startRow: number, startCol: number, dRow: number, dCol: number): string[] => {
    let currentRow = startRow;
    let currentCol = startCol;
    const currentChar = stringArray[currentRow][currentCol];
    let currentString: string[] = [currentChar];

    while (isValidIndex(currentRow + dRow, currentCol + dCol)) {
      currentRow += dRow;
      currentCol += dCol;

      const nextChar = stringArray[currentRow][currentCol];

      if (nextChar === currentChar) {
        currentString.push(nextChar);
      } else {
        break;
      }
    }

    return currentString;
  };

  // Iterate over each element in the array and check all directions
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const directions: [number, number][] = [
        [0, 1], // Right
        [1, 0], // Down
        [1, 1], // Diagonal down-right
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
import * as readline from 'readline';

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

const stringArray: string[][] = [];

// Read each line of input and populate the string array
rl.on('line', (line: string) => {
  const row: string[] = line.trim().split(',').map((char) => char.trim());
  stringArray.push(row);
});

// Process the input once all lines have been read
rl.on('close', () => {
  const longestString = findLongestAdjacentString(stringArray);
  console.log('Longest adjacent string:', longestString);
});
