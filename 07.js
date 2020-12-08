const { readData } = require("./utils");

// const solution1 = () =>
readData("07")
  .then((input) => parseRules(input))
  .then((bagRules) => getBGoldBagCount(bagRules))
  .then((solution) => console.log("solution 1: ", solution)) // 222
  .catch((error) => console.log(error));

readData("07")
  .then((input) => parseRules(input))
  .then((bagRules) => getBagCount("shiny gold bag", bagRules))
  .then((solution) => console.log("solution 2: ", solution)) // 13264
  .catch((error) => console.log(error));

const parseRules = (data) => {
  const rules = {};
  data.forEach((row) => {
    const bagType = row.split("s contain")[0];
    const contains = row
      .split("contain ")[1]
      .slice(0, -1)
      .split(", ")
      .map((i) => {
        if (i === "no other bags") return;
        return {
          bagType:
            i.charAt(i.length - 1) === "."
              ? i.slice(2, i.length - 2)
              : i.charAt(i.length - 1) === "s"
              ? i.slice(2, i.length - 1)
              : i.slice(2, i.length),
          count: Number.parseInt(i.slice(0, 1)),
        };
      });
    rules[bagType] = contains;
  });
  return rules;
};

const getBGoldBagCount = (bagRules) => {
  const namelist = Object.keys(bagRules);
  let lookingFor = ["shiny gold bag"];
  let continueSearch = true;
  while (continueSearch) {
    const foundCount = lookingFor.length;
    namelist.forEach((name) => {
      const bagRule = bagRules[name];
      if (bagRule[0] != undefined) {
        bagRule.forEach((inside) => {
          const insideBagName = inside.bagType;
          if (
            lookingFor.includes(insideBagName) &&
            !lookingFor.includes(name)
          ) {
            lookingFor.push(name);
          }
        });
      }
    });
    continueSearch = foundCount == lookingFor.length ? false : true;
  }
  return lookingFor.length - 1;
};

const getBagCount = (name, bagRules) => {
  const bagRule = bagRules[name];
  if (bagRule[0] == undefined) return 0;
  let total = 0;
  bagRule.forEach((b) => {
    for (let i = 0; i < b.count; i++) {
      total += getBagCount(b.bagType, bagRules) + 1;
    }
  });
  return total;
};
