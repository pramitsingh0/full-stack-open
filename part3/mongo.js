const mongoose = require("mongoose");
async function db() {
  await mongoose.connect(process.env.MONGO_URI);
}

module.exports = db;
