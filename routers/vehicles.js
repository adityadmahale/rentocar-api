const express = require("express");
const { Vehicle, validate } = require("../models/vehicle");
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

router.post("/", [auth, admin], async (req, res) => {
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

router.put("/:id", [auth, admin], async (req, res) => {
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

router.delete("/:id", [auth, admin], async (req, res) => {
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
