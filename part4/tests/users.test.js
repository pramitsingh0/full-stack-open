const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const dummyUsers = require("./dummyUsers");
describe("User", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const userList = dummyUsers.map((user) => new User(user));
    const promiseArray = userList.map((user) => user.save());
    await Promise.all(promiseArray);
  }, 10000000);

  test("fetch all users", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const allUsers = await User.find({});
    expect(allUsers.length).toBe(dummyUsers.length);
    allUsers.forEach((user) => expect(user.id).toBeDefined());
  }, 10000000);

  test("create new user", async () => {
    const user = {
      username: "testUser",
      name: "Robert Thomson",
      passwordHash: "strongpassword",
    };
    await api
      .post("/api/users")
      .send({ user })
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const allUsers = await User.find({});
    expect(allUsers.length).toBe(dummyUsers.length + 1);
    const foundUser = allUsers.find((user) => user.username === "testUser"); // Since username should be unique
    expect(foundUser).toBeDefined();
  }, 10000000);

  test("username and password required", async () => {
    const user = {
      name: "User Denied",
    };
    const resp = await api.post("/api/users").send({ user });
    expect(resp.status).toBe(400);
    expect(resp.error.name).toBe("Error");
  });

  test("username and password must be 3 characters long", async () => {
    const user = {
      username: "ru",
      name: "User Denied",
      passwordHash: "12",
    };
    const resp = await api.post("/api/users").send({ user });
    expect(resp.status).toBe(400);
    expect(resp.error.name).toBe("Error");
  });

  test("username should be unique", async () => {
    const user = {
      username: "user1",
      name: "John Doe",
      passwordHash: "123456",
    };
    const resp = await api.post("/api/users").send({ user }).expect(400);
    expect(resp.error.name).toBe("Error");
  });
});
