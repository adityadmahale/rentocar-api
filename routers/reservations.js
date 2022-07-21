/*
* @author: Maan Mandaliya (B00903171 | mn638205@dal.ca)
* @description: This file has routes with different methods for Reservations API. 
*/
const express = require("express");
const { Reservations, validate } = require("../models/reservation")
const { Vehicle, validateVehicle } = require("../models/vehicle")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")

const router = express.Router();

// Method to get Reservations
router.get("/", async (req, res) => {
    try {
        const reservations = await Reservations.find({ isCancelled: false });
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
        const vehicleModel = {
            regnNo: reservationJSON.regnNo,
            makeYear: reservationJSON.makeYear,
            name: reservationJSON.name,
            type: reservationJSON.type,
            price: reservationJSON.price,
            image: reservationJSON.image,
            color: reservationJSON.color,
            condition: reservationJSON.condition,
            mileage: reservationJSON.mileage,
            stationCode: reservationJSON.stationCode,
            available: reservationJSON.available,
            seats: reservationJSON.seats,
            largeBag: reservationJSON.largeBag,
            smallBag: reservationJSON.smallBag,
            door: reservationJSON.door,
            automatic: reservationJSON.automatic,
            ac: reservationJSON.ac,
            sportsMode: reservationJSON.sportsMode,
            cruiseControl: reservationJSON.cruiseControl,
            childCarSeat: reservationJSON.childCarSeat,
        }
        const vehicle = new Vehicle(vehicleModel);
        const { vehicleError } = validateVehicle(vehicleModel);
        if (vehicleError) return res.status(400).json(vehicleError.details[0].message);
        const reservationModel = {
            number: reservationJSON.bookingID,
            pickupPostal: reservationJSON.pickupPostal,
            dropPostal: reservationJSON.dropPostal,
            registrationDate: new Date(),
            pickupDate: new Date(reservationJSON.pickupDate),
            dropDate: new Date(reservationJSON.dropDate),
            pickupTime: reservationJSON.pickupTime,
            dropTime: reservationJSON.dropTime,
            age: reservationJSON.age,
            nationality: reservationJSON.nationality,
            carType: reservationJSON.type,
            price: reservationJSON.price,
            username: reservationJSON.username,
            vehicle: vehicle,
            vehicleImage: reservationJSON.vehicleImage,
            isCancelled: false,
            cancellationReason: ""
        }
        const { reservationError } = validate(reservationModel);
        if (reservationError) return res.status(400).json(reservationError.details[0].message);
        const reservation = new Reservations(reservationModel);
        const result = await reservation.save()

        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params['id'];
        const { cancellationReason } = req.body;
        const result = await Reservations.findByIdAndUpdate(
            id,
            {
                $set: {
                    isCancelled: true,
                    cancellationReason: cancellationReason
                }
            },
            { new: true }
        );
        if (!result) return res.status(404).json({
            message: "Reservation not found",
            status: false
        })
        else {
            res.status(200).json(result)
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params['id'];
    const reservationJSON = req.body;
    const vehicleModel = {
        regnNo: reservationJSON.regnNo,
        makeYear: reservationJSON.makeYear,
        name: reservationJSON.name,
        type: reservationJSON.type,
        price: reservationJSON.price,
        image: reservationJSON.image,
        color: reservationJSON.color,
        condition: reservationJSON.condition,
        mileage: reservationJSON.mileage,
        stationCode: reservationJSON.stationCode,
        available: reservationJSON.available,
        seats: reservationJSON.seats,
        largeBag: reservationJSON.largeBag,
        smallBag: reservationJSON.smallBag,
        door: reservationJSON.door,
        automatic: reservationJSON.automatic,
        ac: reservationJSON.ac,
        sportsMode: reservationJSON.sportsMode,
        cruiseControl: reservationJSON.cruiseControl,
        childCarSeat: reservationJSON.childCarSeat,
    }
    const vehicle = new Vehicle(vehicleModel);
    const { vehicleError } = validateVehicle(vehicleModel);
    if (vehicleError) return res.status(400).json(vehicleError.details[0].message);
    const updatedReservationModel = {
        number: reservationJSON.bookingID,
        registrationDate: new Date(),
        price: reservationJSON.price,
        vehicle: vehicle,
        vehicleImage: reservationJSON.vehicleImage,
    }
    const { reservationError } = validate(updatedReservationModel);
    if (reservationError) return res.status(400).json(reservationError.details[0].message);
    const result = await Reservations.findByIdAndUpdate(
        id,
        {
            $set: updatedReservationModel
        },
        { new: true }
    );
    if (!result) return res.status(404).json({
        message: "Reservation not found",
        status: false
    })
    else {
        res.status(200).json(result)
    }
});

module.exports = router;