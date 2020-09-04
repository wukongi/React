const Blog = require("../models/blog");

const initialBlog = [
  { title: "this is a test", author: "wulong" },
  { title: "this is the second test", author: "la" },
  { title: "this is the third test", author: "wuwuwu" },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlog,
  blogsInDb,
};
