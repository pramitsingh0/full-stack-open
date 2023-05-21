const express = require("express");
const Router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

// Fetch all Users API
Router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.find({}).populate("blogs");
    res.status(200).json(allUsers);
  } catch (e) {
    next(e);
    res.status(400).send(e);
  }
});
// Create User API
Router.post("/", middleware.userExtractor, async (req, res, next) => {
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

Router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    const passwordResult = await bcrypt.compare(password, user.passwordHash);
    if (!(user && passwordResult)) {
      return res.status(401).json({
        error: "invalid username or password",
      });
    }
    // jwt payload
    const userForToken = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(userForToken, process.env.JWT_SECRET);
    res.status(200).send({ token, username: username, name: user.name });
  } catch (e) {
    next(e);
  }
});

module.exports = Router;
