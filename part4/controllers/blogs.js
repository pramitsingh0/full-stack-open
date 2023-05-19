const express = require("express");
const Router = express.Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

Router.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("creator");
    response.json(blogs);
  } catch (e) {
    next(e);
  }
});

Router.post("/", async (request, response, next) => {
  try {
    // Everytime a blog is created assign a user to it assigned user should be random
    const payload = jwt.verify(request.token, process.env.JWT_SECRET);
    const blogCreator = await User.findOne({ _id: payload.id });
    console.log(blogCreator);
    const blog = new Blog(request.body);
    blog.creator = blogCreator;
    blogCreator.blogs.push(blog);
    blogCreator._id = blogCreator.id;
    delete blogCreator.id;
    const result = await blog.save();
    await blogCreator.save();
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
