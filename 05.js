const { readData } = require("./utils");

//const solution1 = () =>
readData("05")
  .then((data) => getSeatIds(data))
  .then((seatIds) => getHighestId(seatIds))
  .then((result) => console.log(result)) // 959
  .catch((error) => console.log(error));

const ROWS = 127;
const COLUMNS = 7;

const getHalf = (data, min, max) => {
  // console.log("data", data, "min:", min, max);
  const candidateLetter = data.slice(0, 1);
  const newCandidateString = data.slice(1, data.length);
  const half = Math.ceil((max - min) / 2);
  if (min === max) return min;
  if (candidateLetter === "F" || candidateLetter === "L") {
    return getHalf(newCandidateString, min, max - half);
  } else {
    return getHalf(newCandidateString, min + half, max);
  }
};

const getSeatIds = (data) => {
  return data.map((i) => {
    const row = getHalf(i.slice(0, 7), 0, ROWS);
    const line = getHalf(i.slice(8, data.length), 0, COLUMNS);
    return row * 8 + line;
  });
};

const getHighestId = (idArray) => {
  return idArray.reduce((i, candidate) => (candidate > i ? candidate : i), 0);
};
