/*
* @author: Maan Mandaliya (B00903171 | mn638205@dal.ca)
* @description: This is a MongoDB model to manage CRUD operations on JobApplications collection.
*/
const mongoose = require("mongoose");
const Joi = require("joi");

const JobApplications = mongoose.model(
    "JobApplications",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 20
        },
        contact: {
            type: String,
            required: true,
            length: 10
        },
        email: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 20
        },
        status: {
            type: String,
            required: true,
            default: "not-selected"
        }
    })
);

module.exports.validate = (object) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(20).required(),
        contact: Joi.string().min(10).max(10).required(),
        email: Joi.string().required(),
        position: Joi.string().min(1).max(20).required(),
        status: Joi.string().required()
    });

    return schema.validate(object)
};

module.exports.JobApplications = JobApplications;