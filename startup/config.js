// Author: Aditya Mahale(ad619659@dal.ca)

const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("jwtPrivateKey is not defined");
  }
};
