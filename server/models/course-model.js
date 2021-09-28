const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId, // 存另一個Schema的id，此為正式寫法
    ref: "User", // 連結到User Model, User => 一定要符合開頭大寫,不可複數的格式
  },
  students: {
    type: [String],
    default: [],
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
