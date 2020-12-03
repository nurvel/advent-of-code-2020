const { readData } = require("./utils");

readData("03")
  .then((input) => createMatrix(input))
  .then((matrix) => countTreeHits(matrix, 3, 1))
  .then((result) => console.log("solution 1:", result)) // 148
  .catch((error) => console.log(error));

readData("03")
  .then((input) => createMatrix(input))
  .then((matrix) => {
    return slopeScenarios.reduce((cumulator, coordinates) => {
      let treeHits = countTreeHits(matrix, coordinates[0], coordinates[1]);
      return cumulator === 0 ? treeHits : treeHits * cumulator;
    }, 0);
  })
  .then((result) => console.log("solution 2:", result)) // 727923200
  .catch((error) => console.log(error));

const slopeScenarios = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const createMatrix = (data) => {
  const matrix = [];
  for (let i = 0; i < data.length; i++) {
    matrix.push(data[i].split(""));
  }
  return matrix;
};

const countTreeHits = (matrix, moveDown, moveRight) => {
  let count = 0;
  let matrixWidth = matrix[0].length;
  let x = 0;
  for (let y = 0; y < matrix.length; y += moveRight) {
    if (matrix[y][x] === "#") count++;
    x += moveDown;
    if (x > matrixWidth - 1) x -= matrixWidth;
  }
  return count;
};
