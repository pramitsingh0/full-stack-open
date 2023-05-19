const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./mongo");
const blogRoutes = require("./controllers/blogs");
const userRoutes = require("./controllers/users");
const middleware = require("./utils/middleware");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);
dbConnect()
  .then(() => console.log("Conencted to db"))
  .catch((e) => console.log(e));
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
