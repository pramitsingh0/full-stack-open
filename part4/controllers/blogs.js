const express = require("express");
const Router = express.Router();
const Blog = require("../models/blog");
const User = require("../models/user");

Router.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("creator");
    response.json(blogs);
  } catch (e) {
    next(e);
  }
});
const randomNum = () => Math.floor(Math.random() * 10);
Router.post("/", async (request, response, next) => {
  try {
    // Everytime a blog is created assign a user to it assigned user should be random
    const allUsers = await User.find({});
    const randUser = allUsers[randomNum()];
    const blog = new Blog(request.body);
    blog.creator = randUser;
    randUser.blogs.push(blog);
    randUser._id = randUser.id;
    delete randUser.id;
    const result = await blog.save();
    await randUser.save();
    response.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

Router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.status(200).send("Blog deleted");
  } catch (e) {
    next(e);
  }
});
Router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.status(204).json(result);
  } catch (e) {
    next(e);
  }
});
module.exports = Router;
