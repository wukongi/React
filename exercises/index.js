const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const app = express();
const cors = require("cors");

//!导入数据库配置

const phonebook = require("./models/phonebook");

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/persons", (req, res) => {
  phonebook.find({}).then((person) => {
    res.json(person);
  });
});
//!通过get获取info
app.get("/persons/info", (req, res, next) => {
  phonebook
    .estimatedDocumentCount()
    .then((number) => {
      let time = new Date();
      res.send(`<p>phone book has info for ${number} people</p>
  <p>${time}</p>`);
    })
    .catch((error) => next(error));
});
//!通过get获取id
app.get("/persons/:id", (req, res, next) => {
  phonebook
    .findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end;
      }
    })
    .catch((error) => next(error));
});
//!删除
app.delete("/persons/:id", (req, res, next) => {
  phonebook
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(400).end();
    })
    .catch((error) => next(error));
});
//!使用中间件获取request的body

app.post("/persons", (req, res, next) => {
  const body = req.body;
  const person = new phonebook({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedName) => {
      res.json(savedName);
    })
    .catch((error) => {
      next(error);
      res.status(400).end();
    });
});

//!更新数据
app.put("/persons/:id", (req, res, next) => {
  const body = req.body;
  const updateInfo = {
    number: body.number,
  };
  phonebook
    .findByIdAndUpdate(req.params.id, updateInfo, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});
//!错误处理
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
};
app.use(errorHandler);

// //!自定义中间件
// const unknownEndpointer = (request, response) => {
//   response.status(404).send({ error: "unknow endpoint" });
// };
// app.use(unknownEndpointer);

//!morgan中间件
app.use(morgan("tiny"));
app.get("/person", (req, res) => {
  console.log(res.status);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on  port ${PORT}`);
});
