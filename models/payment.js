const mongoose = require("mongoose");
const Joi = require("joi");

const Payment = mongoose.model(
  "Payment",
  new mongoose.Schema({
    bookingID: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
    paymentID: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      }, 
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
    fname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    lname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
      address: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
      },
      city: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
      state: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
      country: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
    zip: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 10,
    },
    insurance: {
        type: Boolean,
      }
  })
);

module.exports.validate = (object) => {
  const schema = Joi.object({
    bookingID: Joi.string().min(3).max(50).required(),
    paymentID: Joi.string().min(3).max(50).required(),
    username: Joi.string().min(3).max(50).required(),
    lname: Joi.string().min(3).max(50).required(),
    fname: Joi.string().min(3).max(50).required(),    
    address: Joi.string().min(3).max(1000).required(),
    city: Joi.string().min(3).max(50).required(),
    state: Joi.string().min(3).max(50).required(),
    country: Joi.string().min(3).max(50).required(),
    zip: Joi.string().min(3).max(10).required(), 
    insurance: Joi.boolean().required()
  });

  return schema.validate(object);
};

module.exports.Payment = Payment;
