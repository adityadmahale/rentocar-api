const express = require("express");
const { SupportTicket, validate } = require("../models/support");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

// API to fetch all the tickets
router.get("/", async (req, res) => {
    try {
        const supportTickets = await SupportTicket.find();
        res.status(200).json(supportTickets);
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
});


router.post("/", [], async (req, res) => {
    try {
        // validating the request body
        const { error } = validate(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        const newTicket = new SupportTicket({
            ticketDescription: req.body.ticketDescription,
            ticketType: req.body.ticketType,
            status: req.body.status,
            raisedBy: req.body.raisedBy,
            modifiedBy: req.body.modifiedBy,
            assignedTo: req.body.assignedTo,
        });
        // console.log("ticket model: ", newTicket);
        await newTicket.save();

        res.status(201).json(newTicket);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
});

module.exports = router;