const express = require("express");
const Router = express.Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

Router.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("creator");
    response.json(blogs);
  } catch (e) {
    next(e);
  }
});

Router.post("/", middleware.userExtractor, async (request, response, next) => {
  try {
    // Everytime a blog is created assign a user to it assigned user should be random
    const blogCreator = request.user;
    if (!blogCreator) {
      response.status(401).send("User unauthorised");
    }
    const blog = new Blog(request.body);
    blog.creator = blogCreator;
    blogCreator.blogs.push(blog);
    blogCreator._id = blogCreator.id;
    delete blogCreator.id;
    const result = await blog.save();
    console.log(result);
    await blogCreator.save();
    response.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

Router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    console.log(req.user._id.toString(), blog.creator._id.toString());
    const userId = req.user._id.toString();
    const creatorId = blog.creator._id.toString();
    if (userId === creatorId) {
      await Blog.deleteOne({ _id: id });
      res.status(200).send("Blog deleted");
    } else {
      res.status(401).send("Request unauthorised");
    }
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
