const { readData } = require("./utils");

readData("08")
  .then((data) => findFlaw(data))
  .then((solution) => console.log("solution 1: ", solution)) // 1087
  .catch((error) => console.log(error));

readData("08")
  .then((data) => bruteFix(data))
  .then((solution) => console.log("solution 2: ", solution)) // 780
  .catch((error) => console.log(error));

const bruteFix = (data) => {
  const runnable = data.map((d) => d.split(" "));
  for (let i = 0; i <= runnable.length; i++) {
    const result = fixFlaw(runnable, i);
    if (result > 0) return result;
  }
  return "no result found";
};

const fixFlaw = (runnable, modifyIndex) => {
  const visited = [];
  let indx = 0;
  let accumulator = 0;

  while (true) {
    const val = runnable[indx];
    let command = val[0];
    const action = val[1].slice(0, 1);
    const value = Math.abs(Number.parseInt(val[1]));

    if (indx === modifyIndex) {
      if (command === "jmp") {
        command = "nop";
      } else if (command === "nop") {
        command = "jmp";
      }
    }

    if (visited[indx] == true) return 0; // return if already visited -> not the rigth path
    visited[indx] = true;

    if (command === "nop") indx++;

    if (command === "acc") {
      if (action === "+") accumulator += value;
      if (action === "-") accumulator -= value;
      indx++;
    }

    if (indx === runnable.length - 1) return accumulator; // result found since reached end of the file

    if (command === "jmp") {
      if (action === "+") indx += value;
      if (action === "-") indx -= value;
    }
  }
};

const findFlaw = (data) => {
  const runnable = data.map((d) => d.split(" "));
  const visited = [];
  let indx = 0;
  let accumulator = 0;

  while (true) {
    if (visited[indx] === true) return accumulator;
    visited[indx] = true;
    const val = runnable[indx];
    const command = val[0];
    const action = val[1].slice(0, 1);
    const value = Math.abs(Number.parseInt(val[1]));

    if (command === "nop") indx++;

    if (command === "acc") {
      if (action === "+") accumulator += value;
      if (action === "-") accumulator -= value;
      indx++;
    }
    if (command === "jmp") {
      if (action === "+") indx += value;
      if (action === "-") indx -= value;
    }
  }
};
