const { readData } = require("./utils");

// const solution1 = () =>
readData("06")
  .then((data) => combineGoupsToOneRow(data))
  .then((data) => getYescount(data))
  .then((solution) => console.log("solution 1: ", solution))
  .catch((error) => console.log(error));

const combineGoupsToOneRow = (data) => {
  const groupsInRows = [];
  let buffer = "";
  for (let i = 0; i <= data.length; i++) {
    if (data[i] === "" || i == data.length) {
      groupsInRows.push(buffer);
      buffer = "";
    } else {
      buffer += data[i];
    }
  }
  return groupsInRows;
};

const getYescount = (data) => {
  return data.reduce((c, d) => {
    return c + distictLettersInString(d).length;
  }, 0);
};

const distictLettersInString = (str) => {
  return String.prototype.concat(...new Set(str));
};

