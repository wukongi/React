const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.initialBlog) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});
describe("firstTest", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});
describe("the second test", () => {
  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlog.length);
  });
});

describe("the third one", () => {
  test("return the specific blog", async () => {
    const response = await api.get("/api/blogs");
    const title = response.body.map((r) => r.title);
    expect(title).toContain("this is a test");
  });
});
describe("the fourth one", () => {
  test("certify the number of the blogs", async () => {
    const newBlog = {
      title: "test",
      author: "this is a test",
    };
    const token =
      "bearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmVtYSI6ImFiYyIsImlkIjoiNWYyNWJkN2EyMDNhZTEzOWVjODdkMTllIiwiaWF0IjoxNTk2MzY4ODUzfQ.V2Ug6HZ7YG21ldPEe1LOH_Dy5XURgCLrP1f16QHe9HI";
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const lastBlog = await helper.blogsInDb();
    expect(lastBlog).toHaveLength(helper.initialBlog.length + 1);
    const blogTitle = lastBlog.map((blog) => blog.title);
    expect(blogTitle).toContain("test");
  });
});
afterAll(() => {
  mongoose.connection.close();
});
