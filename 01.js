
const { readData } = require("./utils");

readData('01')
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      for (let y = 0; y < data.length; y++) {
        const first = parseInt(data[i]);
        const second = parseInt(data[y]);
        const candidate = first + second;
        if (candidate === 2020) {
          return first * second;
        }
      }
    }
  })
  .then((solution) => console.log("solution 1: ", solution))
  .catch((err) => console.log("error", err));

readData('01')
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data.length; x++) {
          const first = parseInt(data[i]);
          const second = parseInt(data[y]);
          const third = parseInt(data[x]);
          const candidate = first + second + third;
          if (candidate === 2020) {
            return first * second * third;
          }
        }
      }
    }
  })
  .then((solution) => console.log("solution 2: ", solution))
  .catch((err) => console.log("error", err));
