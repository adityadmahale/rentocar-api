// Author: Aditya Mahale(ad619659@dal.ca)

const Joi = require("joi");

module.exports = function () {
  Joi.objectId = require("joi-objectid")(Joi);
};
