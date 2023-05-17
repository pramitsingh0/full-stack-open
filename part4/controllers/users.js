const express = require("express");
const Router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Fetch all Users API
Router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (e) {
    next(e);
    res.status(400).send(e);
  }
});
// Create User API
Router.post("/", async (req, res, next) => {
  try {
    // Hash password
    if (req.body.user.passwordHash < 3) {
      const e = new Error("Password length cannot be less than 3");
      e.name = "ValidationError";
      next(e);
    }
    const hashedPassword = await bcrypt.hash(req.body.user.passwordHash, 10);
    req.body.user.passwordHash = hashedPassword;
    const newUser = new User(req.body.user);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (e) {
    next(e);
    res.status(400).send(e);
  }
});

module.exports = Router;
