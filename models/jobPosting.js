/*
* @author: Maan Mandaliya (B00903171 | mn638205@dal.ca)
* @description: This is a MongoDB model to manage CRUD operations on JobPostings collection.
*/
const mongoose = require("mongoose");
const Joi = require("joi");

const JobPostings = mongoose.model(
    "JobPostings",
    new mongoose.Schema({
        position: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 20
        },
        location: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 20
        },
        pay: {
            type: Number,
            required: true,
        },
        jobType: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 20
        },
        expiryDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            default: "enable"
        }
    })
);

module.exports.validate = (object) => {
    const schema = Joi.object({
        position: Joi.string().min(1).max(20).required(),
        location: Joi.string().min(1).max(20).required(),
        pay: Joi.number().min(13.35).required(),
        jobType: Joi.string().min(1).max(20).required(),
        expiryDate: Joi.date().required(),
        status: Joi.string()
    });

    return schema.validate(object)
};

module.exports.JobPostings = JobPostings;