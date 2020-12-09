const { readData } = require("./utils");

readData("09")
  .then((input) => findInvalidNumber(input.map((x) => Number.parseInt(x)))) // 375054920
  .then((solution) => console.log("solution 1: ", solution))
  .catch((error) => console.log(error));

readData("09")
  .then((input) => findSeries(input.map((x) => Number.parseInt(x))))
  .then((solution) => console.log("solution 2: ", solution)) // 54142584
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

const findSeries = (data) => {
  const invalidNumber = findInvalidNumber(data);
  for (let i = 0; i < data.length; i++) {
    for (let y = i + 1; y < data.length; y++) {
      const dataSet = data.slice(i, y);
      const sum = dataSet.reduce((c, i) => {
        return c + i;
      }, 0);
      if (sum === invalidNumber) {
        const smallest = dataSet.reduce((c, i) => (c > i ? i : c));
        const largest = dataSet.reduce((c, i) => (c < i ? i : c));
        return smallest + largest;
      }
    }
  }
};
