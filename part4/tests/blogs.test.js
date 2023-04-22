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
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .expect(function (res) {
        expect(res.body.length).toBe(dummyBlogs.length);
        res.body.forEach((data) => expect(data.id).toBeDefined());
      });
  }, 100000);
  test("create new", async () => {
    await api
      .post("/api/blogs")
      .send({
        title: "This is title",
        author: "Pramit",
        url: "https://testblog.com",
        likes: 10,
      })
      .set("Accept", "application/json")
      .expect(201)
      .expect("Content-Type", /application\/json/)
      .expect(async function (res) {
        console.log("Present here");
        const blogs = await Blog.find({});
        expect(blogs.length).toBe(dummyBlogs.length + 1);
        expect(res.body.title).toBe("This is title");
      });
  });
});
