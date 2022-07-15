/*
* @author: Maan Mandaliya (B00903171 | mn638205@dal.ca)
* @description: Sample Description
*/

const mongoose = require("mongoose");
const Joi = require("joi");

const Reservation = mongoose.model(
    "Reservation",
    new mongoose.Schema({
        pickupPostal: {
            type: String,
            required: true,
            length: 6,
        },
        dropPostal: {
            type: String,
            required: true,
            length: 6,
        },
        pickupDate: {
            type: Date,
            required: true,
        },
        dropDate: {
            type: Date,
            required: true,
        },
        pickupTime: {
            type: Date,
            required: true,
        },
        dropTime: {
            type: Date,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        nationality: {
            type: String,
            required: true,
        },
        carType: {
            type: String,
            required: true,
        },
        isCancelled: {
            type: Boolean
        },
        cancellationReason: {
            type: String
        }
    })
);

module.exports.validate = (object) => {
    const schema = Joi.object({

    });

    return schema.validate(object)
};

module.exports.Reservation = Reservation;