const express = require("express");
const { Offer, validate } = require("../models/offer");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
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

    const offer = new Offer({
      title: req.body.title,
      description: req.body.description,
    });
    await offer.save();

    res.status(201).json(offer);
  } catch (err) {
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

    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      {
        $set: { title: req.body.title, description: req.body.description },
      },
      { new: true }
    );
    if (!offer)
      return res
        .status(404)
        .json(`The offer with the ID ${req.params.id} was not found.`);

    res.status(200).json(offer);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const offer = await Offer.findByIdAndRemove(req.params.id);
    if (!offer)
      return res
        .status(404)
        .json(`The offer with the ID ${req.params.id} was not found.`);
    res.status(200).json(offer);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

module.exports = router;
