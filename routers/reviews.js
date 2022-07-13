const express = require("express");
const {
  Review,
  validate,
  validateDelete,
  validateUpdate,
} = require("../models/review");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const reviews = await Review.find({ vehicle: req.params.id }).populate(
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
      date: Date.now(),
      user: req.body.user,
      vehicle: req.body.vehicle,
      yes: 0,
      no: 0,
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

router.delete("/:id", [auth], async (req, res) => {
  try {
    const review = await Review.findByIdAndRemove(req.params.id);
    if (!review)
      return res
        .status(404)
        .json(`The offer with the ID ${req.params.id} was not found.`);
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

router.put("/:id", [auth], async (req, res) => {
  try {
    const { error } = validateUpdate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json(`The review was not found.`);

    if (req.body.liked) review.yes = review.yes + 1;
    else review.no = review.no + 1;

    await review.save();
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

module.exports = router;
