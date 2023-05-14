const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const dummyBlogs = require("./dummyBlogs");
const { application } = require("express");

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
      .expect("Content-Type", /application\/json/);
    const allBlogs = await Blog.find({});
    expect(allBlogs.length).toBe(dummyBlogs.length);
    allBlogs.forEach((data) => expect(data.id).toBeDefined);
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
      .expect("Content-Type", /application\/json/);
    const createdBlog = await Blog.find({ title: "This is title" });
    expect(createdBlog).toBeDefined();
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
    expect(addedBlog.likes).toBe(0);
  });

  test("bad request, title or url properties missing", async () => {
    const testBlog = {
      author: "Pramit Singh",
    };
    await api.post("/api/blogs").send(testBlog).expect(400);
  });

  test("delete", async () => {
    const blogToBeDeleted = await Blog.findOne({});
    await api.delete(`/api/blogs/${blogToBeDeleted.id}`).expect(200);
  });

  test("update info", async () => {
    const postToBeUpdated = await Blog.findOne({});
    postToBeUpdated.author = "Pramit";
    await api
      .put(`/api/blogs/${postToBeUpdated.id}`)
      .send(postToBeUpdated)
      .expect(204);
    const updatedBlog = await Blog.findById(postToBeUpdated.id);
    expect(updatedBlog.author).toBe("Pramit");
  });
});
