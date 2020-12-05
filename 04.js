const { readData } = require("./utils");

//const solution1 = () =>
readData("04")
  .then((data) => parsePassports(data))
  .then((passports) => validPassportCountV1(passports))
  .then((result) => console.log("solution 1:", result)) // 204
  .catch((error) => console.log(error));

//const solution2 = () =>
readData("04")
  .then((data) => parsePassports(data))
  .then((passports) => validPassportCountV2(passports))
  .then((result) => console.log("solution 2:", result)) // 179
  .catch((error) => console.log(error));

const parsePassports = (input) => {
  const passportData = [];
  let rowBuffer = "";

  for (let i = 0; i <= input.length; i++) {
    rowBuffer = rowBuffer === "" ? input[i] : rowBuffer + " " + input[i];
    if (input[i + 1] === "" || i == input.length) {
      const strucRow = structureData(rowBuffer);
      passportData.push(strucRow);
      rowBuffer = "";
    }
  }
  return passportData;
};

const structureData = (input) => {
  const rowArray = input.split(" ");
  const objRow = {};
  rowArray.forEach((i) => {
    const row = i.split(":");
    objRow[row[0]] = row[1];
  });
  return objRow;
};

const validPassportCountV1 = (passports) => {
  return passports.reduce((c, i) => (validateRequiredFields(i) ? c + 1 : c), 0);
};

const validPassportCountV2 = (passports) => {
  return passports.reduce(
    (c, i) => (validateAllPassPortFields(i) ? c + 1 : c),
    0
  );
};

const validateAllPassPortFields = (passport) => {
  if (
    validateRequiredFields(passport) &&
    validateYear(passport.byr, 1920, 2002) &&
    validateYear(passport.iyr, 2010, 2020) &&
    validateYear(passport.eyr, 2020, 2030) &&
    validateHeight(passport.hgt) &&
    validateHair(passport.hcl) &&
    validateEye(passport.ecl) &&
    validateId(passport.pid)
  )
    return true;
  return false;
};

const validateRequiredFields = (passport) => {
  return (
    Object.keys(passport).length === 8 ||
    (Object.keys(passport).length === 7 && passport["cid"] === undefined)
  );
};

const validateYear = (num, min, max) => {
  const year = Number.parseInt(num);
  return year >= min && year <= max;
};

const validateHeight = (inputHeight) => {
  const height = Number.parseInt(inputHeight.slice(0, 3));
  const unitString = inputHeight.slice(-2);
  switch (unitString) {
    case "cm":
      return height >= 150 && height <= 193;
    case "in":
      return height >= 59 && height <= 76;
    default:
      return false;
  }
};

const validateHair = (inputHairColor) => {
  const nrSymbol = inputHairColor.slice(0, 1);
  const data = inputHairColor.slice(1, inputHairColor.length);
  const reg = "^[a-f0–9]|[0-9]|[a-f]{6}"; // letters a-f or numbers 0-9, length 6
  return nrSymbol === "#" && data.match(reg);
};

const validateEye = (inputEyeColor) => {
  const validColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  return validColors.includes(inputEyeColor);
};

const validateId = (inputId) => {
  const regNumbers = "^[0-9]{9}$"; // only numbers 0-9, length 9
  return inputId.match(regNumbers);
};

module.exports = {
  validateYear,
  validateHeight,
  validateHair,
  validateEye,
  validateId,
};
