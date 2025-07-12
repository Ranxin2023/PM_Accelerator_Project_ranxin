// models/Question.js
const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  userName: String,
  text: String,
  time: String,
});

const QuestionSchema = new mongoose.Schema({
  title: String,
  replies: [AnswerSchema],
  answers: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Forum", QuestionSchema);
