/* Author: @104 Shaik Asaduddin (sh465111@dal.ca) - Maintainer */
const mongoose = require("mongoose");
const Joi = require("joi");

const Station = mongoose.model(
    "Station",
    new mongoose.Schema({
        stationName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        stationCode: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 4,
        },
        address: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        capacity: {
            type: Number,
            required: true,
            minlength: 1
        }
    })
);

module.exports.validate = (object) => {
    const schema = Joi.object({
        stationName: Joi.string().min(3).max(50).required(),
        stationCode: Joi.string().min(3).max(4).required(),
        address: Joi.string().min(3).max(50).required(),
        capacity: Joi.number().min(1).required(),
    });

    return schema.validate(object);
};

module.exports.Station = Station;
