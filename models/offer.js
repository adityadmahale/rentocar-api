const mongoose = require("mongoose");
const Joi = require("joi");

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
  })
);

module.exports.validate = (object) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(1000).required(),
  });

  return schema.validate(object);
};

module.exports.Offer = Offer;
