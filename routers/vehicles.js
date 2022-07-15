const express = require("express");
const { Vehicle, validate } = require("../models/vehicle");
const { Station } = require("../models/station");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

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

router.post("/", [], async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).json(error.details[0].message);

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

router.post('/search', async (req, res) => {
  try {
    const { pickupStation, dropoffStation } = req.body;
    console.log("pickupStation: ", pickupStation);
    const vehicles = await Vehicle.find({
      // find vehicles that are available and have the pickUpStationCode in address regex
      available: true
    });

    const regex = new RegExp(`${pickupStation}`, "i")
    console.log("regex: ", regex);
    // get all stations which contains the pickUpStation in their address
    const stations = await Station.find({
      address: { $regex: regex }
    });

    console.log("stations: ", stations);
    res.status(200).json(vehicles);
  } catch(err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

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
