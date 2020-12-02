const { readData } = require("./utils");

readData("02")
  .then(
    (data) =>
      data.map((i) => parseRow(i)).filter((i) => checkLetterCountConstraint(i))
        .length
  )
  .then((result) => console.log("solution 1:", result))
  .catch((error) => console.log(error));

readData("02")
  .then(
    (data) =>
      data.map((i) => parseRow(i)).filter((i) => checkPositionConstraint(i))
        .length
  )
  .then((result) => console.log("solution 2:", result))
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

const checkLetterCountConstraint = (input) => {
  const count = letterCount(input.password, input.letter);
  return count >= input.min && count <= input.max;
};

const checkPositionConstraint = (input) => {
  const pwArray = input.password.split('');
  const isInFirstIndex = pwArray[input.min - 1] === input.letter;
  const isInSecondIndex = pwArray[input.max - 1] === input.letter;
  return isInFirstIndex != isInSecondIndex;
};
