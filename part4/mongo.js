const mongoose = require("mongoose");
const { MONGO_URI } = require("./utils/config");
async function dbConnect() {
  await mongoose.connect(MONGO_URI);
}
module.exports = dbConnect;
