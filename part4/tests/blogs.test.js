const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const dummyBlogs = require("./dummyBlogs");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogList = dummyBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogList.map((blog) => blog.save());
  await Promise.all(promiseArray);
}, 1000000);

describe("blog", () => {
  test("fetch all", async () => {
    const { blogs } = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .expect(function (res) {
        console.log(res.body);
        expect(res.body.length).toBe(dummyBlogs.length);
      });
  }, 100000);
});

afterAll(() => {
  mongoose.connection.close();
});
