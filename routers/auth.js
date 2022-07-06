const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const auth = require("../middleware/auth");
const { User } = require("../models/user");

const route = express.Router();

route.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

route.post("/", async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string()
        .min(5)
        .max(50)
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(5).max(50).required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).json({ message: "Invalid email or password" });
    const token = user.generateAuthToken();
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

module.exports = route;
