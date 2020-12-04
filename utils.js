

const fs = require("fs");

const readData = async (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./data/${filename}.txt`, "utf8", function (err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve(data.split("\n"));
    });
  });
};

exports.readData = readData;
