const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./mongo");
const blogRoutes = require("./controllers/blogs");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect()
  .then(() => console.log("Conencted to db"))
  .catch((e) => console.log(e));
app.use("/api/blogs", blogRoutes);

module.exports = app;
