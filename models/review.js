const mongoose = require("mongoose");
const Joi = require("joi");

const Review = mongoose.model(
  "Review",
  new mongoose.Schema({
    rating: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1000,
    },
    date: {
      type: Date,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
  })
);

module.exports.validate = (object) => {
  const schema = Joi.object({
    rating: Joi.number().min(0).max(5).required(),
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(100).required(),
    date: Joi.date().required(),
    user: Joi.objectId().required(),
    vehicle: Joi.objectId().required(),
  });

  return schema.validate(object);
};

module.exports.validateDelete = (object) => {
  const schema = Joi.object({
    user: Joi.objectId().required(),
    vehicle: Joi.objectId().required(),
  });

  return schema.validate(object);
};

module.exports.Review = Review;
