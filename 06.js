const { readData } = require("./utils");

// const solution1 = () =>
readData("06")
  .then((data) => combineGoupsToOneRow(data))
  .then((data) => getYescount(data))
  .then((solution) => console.log("solution 1: ", solution)) // 6911
  .catch((error) => console.log(error));

readData("06")
  .then((data) => combineGoupsToObject(data))
  .then((data) => getSameYescount(data))
  .then((solution) => console.log("solution 2: ", solution)) // 3473
  .catch((error) => console.log(error));

const combineGoupsToObject = (data) => {
  const groupsInRows = [];
  let groupSet = {
    persons: 0,
    answers: {},
  };
  for (let i = 0; i <= data.length; i++) {
    const rowData = data[i];
    if (rowData === "" || i == data.length) {
      groupsInRows.push(groupSet);
      groupSet = {
        persons: 0,
        answers: {},
      };
    } else {
      groupSet.persons += 1;
      rowData.split("").forEach((element) => {
        groupSet.answers[element] =
          groupSet.answers[element] === undefined
            ? 1
            : groupSet.answers[element] + 1;
      });
    }
  }
  return groupsInRows;
};

const getSameYescount = (data) => {
  let count = 0;
  data.forEach((i) => {
    Object.values(i.answers).forEach((x) => {
      if (x === i.persons) count++;
    });
  });

  return count;
};

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
