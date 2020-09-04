const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const api = supertest(app);

describe("the test", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("123445", 10);
    const newUser = {
      username: "abcdefg",
      name: "bob",
      passwordHash,
    };
    let savedUser = new User(newUser);
    await savedUser.save();
  });
  test("try post the user", async () => {
    const newUser = {
      username: "ee",
      name: "david",
      passowrd: 123456,
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("short");
  });
});

test("get the information", async () => {
  const result = await api.get("/api/users");
});
afterAll(() => {
  mongoose.connection.close();
});
