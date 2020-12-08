const { readData } = require("./utils");

// const solution1 = () =>
readData("08")
  .then((data) => findFlaw(data))
  .then((solution) => console.log("solution 1: ", solution)) // XXX
  .catch((error) => console.log(error));

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
