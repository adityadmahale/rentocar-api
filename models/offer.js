// Author: Aditya Mahale(ad619659@dal.ca)

const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose model and schema for offers
const Offer = mongoose.model(
  "Offer",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1000,
    },
    discount: {
      type: Number,
      required: true,
    },
  })
);

// Request body validation for adding offers
module.exports.validate = (object) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(1000).required(),
    discount: Joi.number().min(1).max(90).required(),
  });

  return schema.validate(object);
};

module.exports.Offer = Offer;
