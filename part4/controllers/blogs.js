const express = require("express");
const Router = express.Router();
const Blog = require("../models/blog");

Router.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (e) {
    console.log(e);
    response.send(e);
  }
});
Router.post("/", async (request, response) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (e) {
    console.log(e);
    response.send(e);
  }
});

module.exports = Router;
