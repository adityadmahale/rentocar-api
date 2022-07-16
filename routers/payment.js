const express = require("express");
const { Payment, validate } = require("../models/payment");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router.post("/", [], async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).json(error.details[0].message);
  
      const payment = new Payment({
        fname: req.body.fname,
        lname: req.body.lname,
        bookingID: req.body.bookingID,
        paymentID: req.body.paymentID,
        username: req.body.username,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        zip: req.body.zip,
        insurance: req.body.insurance
      });
      await payment.save();
  
      res.status(201).json(payment);
    } catch (err) {
        console.log(err.message)
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  });

  module.exports = router;