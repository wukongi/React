const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controller/blogs");
const usersRouter = require("./controller/user");
const loginRouter = require("./controller/login");
const mongoose = require("mongoose");

logger.info("connecting", config.url);
mongoose
  .connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info("MONGODB connected");
  })
  .catch((error) => {
    logger.error(error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandle);

module.exports = app;
