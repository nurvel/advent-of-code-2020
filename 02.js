const { readData } = require("./utils");

readData("02")
    .then((data) =>data.map((i) => parseRow(i)).filter((i) => checkConstraints(i)).length)
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

const parseRow = (input) => {
  parts = input.split(" ");
  return {
    min: parts[0].split("-")[0],
    max: parts[0].split("-")[1],
    letter: parts[1].split(":")[0],
    password: parts[2],
  };
};

const letterCount = (word, letter) => word.split(letter).length - 1;

const checkConstraints = (input) => {
  const count = letterCount(input.password, input.letter);
  return count >= input.min && count <= input.max;
};
