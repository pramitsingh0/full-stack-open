const helpers = require("../utils/list_helpers");
const blogs = require("./dummyBlogs");

test("dummy returns one", () => {
  const blogs = [];
  const result = helpers.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("list of 5 blogs", () => {
    const result = helpers.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe("favourite blog", () => {
  test("list of 5 blogs", () => {
    const result = helpers.favouriteBlog(blogs);
    expect(result).toEqual(blogs[2]);
  });
});
