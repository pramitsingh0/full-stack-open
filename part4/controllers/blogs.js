const express = require("express");
const Router = express.Router();
const Blog = require("../models/blog");

Router.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (e) {
    next(e);
  }
});

Router.post("/", async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
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
