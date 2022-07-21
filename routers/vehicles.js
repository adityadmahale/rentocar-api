/* Author: @104 Shaik Asaduddin (sh465111@dal.ca) - Maintainer */
const express = require("express");
const { Vehicle, validate } = require("../models/vehicle");
const { Station } = require("../models/station");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

// router path to get all vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

// router path for creating a new vehicle
router.post("/", [], async (req, res) => {
    try {
        // validating the request body
        const { error } = validate(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        // creating a new vehicle
        const vehicle = new Vehicle({
            regnNo: req.body.regnNo,
            makeYear: req.body.makeYear,
            name: req.body.name,
            type: req.body.type,
            price: req.body.price,
            image: req.body.image,
            color: req.body.color,
            condition: req.body.condition,
            mileage: req.body.mileage,
            stationCode: req.body.stationCode,
            available: req.body.available,
            seats: req.body.seats,
            largeBag: req.body.largeBag,
            smallBag: req.body.smallBag,
            door: req.body.door,
            automatic: req.body.automatic,
            ac: req.body.ac,
            sportsMode: req.body.sportsMode,
            cruiseControl: req.body.cruiseControl,
            childCarSeat: req.body.childCarSeat,
        });
        console.log("vehicle: ", vehicle);
        await vehicle.save();

    res.status(201).json(vehicle);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

// router path for updating a vehicle
router.put("/:id", [], async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

        const vehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    regnNo: req.body.regnNo,
                    makeYear: req.body.makeYear,
                    name: req.body.name,
                    type: req.body.type,
                    price: req.body.price,
                    image: req.body.image,
                    color: req.body.color,
                    condition: req.body.condition,
                    mileage: req.body.mileage,
                    stationCode: req.body.stationCode,
                    available: req.body.available,
                    seats: req.body.seats,
                    largeBag: req.body.largeBag,
                    smallBag: req.body.smallBag,
                    door: req.body.door,
                    automatic: req.body.automatic,
                    ac: req.body.ac,
                    sportsMode: req.body.sportsMode,
                    cruiseControl: req.body.cruiseControl,
                    childCarSeat: req.body.childCarSeat,
                },
            },
            { new: true }
        );
        if (!vehicle)
            return res
                .status(404)
                .json(`The vehicle with the ID ${req.params.id} was not found.`);

    res.status(200).json(vehicle);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

router.post("/search", async (req, res) => {
  try {
    const reservationData = req.body;
    console.log("vehicles.js (reservationData): ", reservationData);
    // Find station code from pickup postal code
    const regex = new RegExp(`.*${reservationData.pickupPostal}.*`, "i")
    const stations = await Station.find({ address: { $regex: regex } })
    console.log("vehicles.js (stations): ", stations)
    var stationCodes = []
    stations.forEach(station => {
      stationCodes.push(station.stationCode)
    });
    console.log("vehicles.js (stationCodes): ", stationCodes)
    // Find vehicles which are available at those stationCodes
    // Requirements: vehicle : type, stationCode, available
    var vehicles;
    if (reservationData.carType === "Any") {
      vehicles = await Vehicle.find({ stationCode: { $in: stationCodes }, available: true }).sort({price:1});
    }
    else {
      vehicles = await Vehicle.find({ type: reservationData.carType, stationCode: { $in: stationCodes }, available: true }).sort({price:1});
    }
    console.log("vehicles.js (vehicles): ", vehicles)
    res.status(200).json(vehicles);
  }
  catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

router.post("/filterAllVehicles", async (req, res) => {
  try {
    let vehicles = [];
    if (!req.body.regnNo) {
      delete req.body.regnNo;
    }
    try {
      vehicles = await Vehicle.find({
        // find vehicles based on condition, vehicleType, available, ac, sportsMode, cruiseControl, childCarSeat
        ...req.body
      });
    } catch (err) {
      console.log(err);
    }
    res.status(200).json(vehicles);
  }
  catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

// router path for deleting a vehicle
router.delete("/:id", [], async (req, res) => {
  try {
      const vehicle = await Vehicle.findByIdAndRemove(req.params.id);
      console.log("vehicle: ", vehicle);
      if (!vehicle)
          return res
              .status(404)
              .json(`The vehicle with the ID ${req.params.id} was not found.`);
      res.status(200).json(vehicle);
  } catch (err) {
      res.status(500).json({
          message: "Internal server error",
          success: false,
      });
  }
});

module.exports = router;
