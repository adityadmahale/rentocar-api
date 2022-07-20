const mongoose = require("mongoose");
const Joi = require("joi");

const SupportTicket = mongoose.model(
    "SupportTicket",
    new mongoose.Schema({
        ticketDescription: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 100,
        },
        ticketType: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        status: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 30
        },
        raisedBy: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 40
        },
        modifiedBy: {
            type: String,
            required: false,
            minlength: 3,
            maxlength: 50,
        },
        assignedTo: {
            type: String,
            required: false,
        },
    })
);

module.exports.validate = (object) => {
    const schema = Joi.object({
        ticketDescription: Joi.string().min(3).max(100).required(),
        ticketType: Joi.string().min(3).max(50).required(),
        status: Joi.string().min(1).max(30).required(),
        raisedBy: Joi.string().min(1).max(40).required(),
        modifiedBy: Joi.any(),
        assignedTo: Joi.any()
    });

    return schema.validate(object);
};
module.exports.SupportTicket = SupportTicket;