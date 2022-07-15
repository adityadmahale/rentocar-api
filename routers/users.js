const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");

const route = express.Router();

route.post("/register", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).json({ message: "User already registered" });

    user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(user, ["_id", "username", "email"]));
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

module.exports = route;
