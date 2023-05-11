const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const dummyBlogs = require("./dummyBlogs");

describe("blog", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogList = dummyBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogList.map((blog) => blog.save());
    await Promise.all(promiseArray);
  }, 1000000);

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
        console.log(console.log(blogs));
        expect(blogs.length).toBe(dummyBlogs.length + 1);
        expect(res.body.title).toBe("This is title");
        expect(res.body.author).toBe("Pramit");
        expect(res.body.likes).toBe(10);
      });
  });

  test("verify like property if missing from the request, it will default to 0", async () => {
    const testBlog = {
      title: "The theory of everything",
      author: "some weird scientist",
      url: "https://everything.com/theory",
    };
    await api.post("/api/blogs").send(testBlog).expect(201);
    const blogsInDb = await Blog.find({});
    const addedBlog = blogsInDb.find(
      (blog) => blog.title === "The theory of everything"
    );
    console.log(addedBlog);
    expect(addedBlog.likes).toBe(0);
  });

  test("bad request, title or url properties missing", async () => {
    const testBlog = {
      author: "Pramit Singh",
    };
    await api.post("/api/blogs").send(testBlog).expect(400);
  });
});
