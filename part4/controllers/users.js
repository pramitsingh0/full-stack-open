const express = require("express");
const Router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Fetch all Users API
Router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
// Create User API
Router.post("/", async (req, res) => {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.user.passwordHash, 10);
    req.body.user.passwordHash = hashedPassword;
    const newUser = new User(req.body.user);
    await newUser.save();
    console.log("successful");
    res.status(200).send(newUser);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = Router;
