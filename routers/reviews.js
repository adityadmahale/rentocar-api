const express = require("express");
const { Review, validate, validateDelete } = require("../models/review");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({ vehicle: req.body.vehicle }).populate(
      "user",
      "username"
    );
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

router.post("/", [auth], async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const review = new Review({
      rating: req.body.rating,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      user: req.body.user,
      vehicle: req.body.vehicle,
    });
    await review.save();

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

router.delete("/", [auth], async (req, res) => {
  try {
    const { error } = validateDelete(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const review = await Review.findOneAndDelete({
      user: req.body.user,
      vehicle: req.body.vehicle,
    });
    if (!review) return res.status(404).json(`The review was not found.`);
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

module.exports = router;
