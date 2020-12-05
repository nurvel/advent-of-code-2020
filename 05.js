const { readData } = require("./utils");

// const solution1 = () =>
readData("05")
  .then((data) => getSeatIds(data))
  .then((seatIds) => getHighestId(seatIds))
  .then((result) => console.log("result 1: ", result)) // 959
  .catch((error) => console.log(error));

readData("05")
  .then((data) => getSeatIds(data))
  .then((seatIds) => findMissingId(seatIds))
  .then((result) => console.log("result 2:", result)) // 527
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
    const line = getHalf(i.slice(i.length - 3, i.length), 0, COLUMNS);
    // console.log("data: ", i, row, line, "id", Number.parseInt(row * 8 + line));
    return Number.parseInt(row * 8 + line);
  });
};

const getHighestId = (idArray) => {
  return idArray.reduce((i, candidate) => (candidate > i ? candidate : i), 0);
};

const findMissingId = (idArray) => {
  idArray.sort((a, b) => a - b);
  for (let i = 0; i < idArray.length; i++) {
    let candidate = idArray[i];
    if (idArray[i + 1] != candidate + 1) return candidate + 1;
  }
};
