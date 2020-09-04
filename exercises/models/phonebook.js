const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;
mongoose.set("useFindAndModify", false);
console.log("connecting to", url);
//!检测连接信息,没有错误用then接受,错误用catch接受
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
const uniqueValidator = require("mongoose-unique-validator");
const phonebookSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true, unique: true },
  number: { type: Number, minlength: 8, required: true },
});
phonebookSchema.plugin(uniqueValidator);
//!格式化Mongoose返回筛选过后的对象
phonebookSchema.set("toJSON", {
  transform: (doucment, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
  },
});
module.exports = mongoose.model("Phone", phonebookSchema);
