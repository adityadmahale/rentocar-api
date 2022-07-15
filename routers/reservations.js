/*
* @author: Maan Mandaliya (B00903171 | mn638205@dal.ca)
* @description: This file has routes with different methods for Reservations API. 
*/
const express = require("express");
const { Reservations, validate } = require("../models/reservation")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")

const router = express.Router();

// Method to get Reservations
router.get("/", async (req, res) => {
    try {
        const reservations = await Reservations.find();
        res.status(200).json(reservations)
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
});

// Method to add Reservation
router.post("/add", async (req, res) => {
    try {
        const reservationJSON = req.body;
        const { error } = validate(reservationJSON);
        if (error) return res.status(400).json(error.details[0].message);

        const reservation = new Reservations({
            number: reservationJSON.number,
            pickupPostal: reservationJSON.pickupPostal,
            dropPostal: reservationJSON.dropPostal,
            pickupDate: reservationJSON.pickupDate,
            dropDate: reservationJSON.dropDate,
            pickupTime: reservationJSON.pickupTime,
            dropTime: reservationJSON.dropTime,
            age: reservationJSON.age,
            nationality: reservationJSON.nationality,
            carType: reservationJSON.carType,
            price: reservationJSON.price,
            user: reservationJSON.user,
            vehicle: reservationJSON.vehicle
        });
        const result = await reservation.save();

        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
});

module.exports = router;