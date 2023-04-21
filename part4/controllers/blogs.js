const express = require("express");
const Router = express.Router();
const Blog = require("../models/blog");

Router.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});
Router.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = Router;
