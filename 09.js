const { readData } = require("./utils");

readData("09")
  .then((input) => findInvalidNumber(input.map((x) => Number.parseInt(x))))
  .then((solution) => console.log("solution 1: ", solution))
  .catch((error) => console.log(error));

const findInvalidNumber = (data) => {
  let numbers = data.slice(0, 25);
  for (let i = 25; i < data.length; i++) {
    let n = data[i];
    if (!isSumOfSom(n, numbers)) return n;
    numbers = data.slice(i - 25, 25 + i);
  }
  return 0;
};

const isSumOfSom = (n, numbers) => {
  for (let i = 0; i < numbers.length; i++) {
    for (let y = 0; y < numbers.length; y++) {
      if (n === numbers[i] + numbers[y]) return true;
    }
  }
  return false;
};
