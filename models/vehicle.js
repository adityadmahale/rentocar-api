/* Author: @104 Shaik Asaduddin (sh465111@dal.ca) - Maintainer */
const mongoose = require("mongoose");
const Joi = require("joi");

const Vehicle = mongoose.model(
    "Vehicle",
    new mongoose.Schema({
        regnNo: {
            type: Number,
            required: true,
        },
        makeYear: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        color: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        condition: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        mileage: {
            type: Number,
            required: true,
        },
        stationCode: {
            type: Number,
            required: true,
        },
        available: {
            type: Boolean,
            required: true,
        },
        seats: {
            type: Number,
            required: true,
        },
        door: {
            type: Boolean,
            required: true,
        },
        automatic: {
            type: Boolean,
            required: true,
        },
        ac: {
            type: Boolean,
            required: true,
        },
        sportsMode: {
            type: Boolean,
            required: true,
        },
        cruiseControl: {
            type: Boolean,
            required: true,
        },
        childCarSeat: {
            type: Boolean,
            required: true,
        },
        largeBag: {
            type: Number,
            required: true,
        },
        smallBag: {
            type: Number,
            required: true,
        },
    })
);

module.exports.validateVehicle = (object) => {
    const schema = Joi.object({
        regnNo: Joi.number().min(1).required(),
        makeYear: Joi.number().min(1).required(),
        name: Joi.string().min(3).max(50).required(),
        type: Joi.string().min(3).max(50).required(),
        price: Joi.number().min(1).required(),
        image: Joi.string().required(),
        color: Joi.string().min(3).max(50).required(),
        condition: Joi.string().min(3).max(50).required(),
        mileage: Joi.number().min(1).required(),
        stationCode: Joi.number().min(1).required(),
        available: Joi.boolean(),
        seats: Joi.number().min(1).max(10).required(),
        largeBag: Joi.number().min(1).max(10).required(),
        smallBag: Joi.number().min(1).max(10).required(),
        door: Joi.boolean(),
        automatic: Joi.boolean(),
        ac: Joi.boolean(),
        sportsMode: Joi.boolean(),
        cruiseControl: Joi.boolean(),
        childCarSeat: Joi.boolean(),
    });

    return schema.validate(object);
};

module.exports.Vehicle = Vehicle;
