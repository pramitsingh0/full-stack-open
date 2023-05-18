const dummyUsers = require("../tests/dummyUsers");
const User = require("../models/user");
const populateDb = async () => {
  await User.deleteMany({});
  const userList = dummyUsers.map((user) => new User(user));
  const promiseArray = userList.map((user) => user.save());
  await Promise.all(promiseArray);
};

module.exports = populateDb;
