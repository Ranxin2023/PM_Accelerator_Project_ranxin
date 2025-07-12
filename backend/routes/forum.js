const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// GET /api/forum?sort=newest|popular|unanswered
router.get("/", async (req, res) => {
  const sort = req.query.sort || "newest";

  let sortOption = { createdAt: -1 };
  if (sort === "popular") sortOption = { answers: -1 };
  if (sort === "unanswered") sortOption = { createdAt: -1 };

  const questions = await Question.find().sort(sortOption);
  const filtered = sort === "unanswered"
    ? questions.filter((q) => q.answers === 0)
    : questions;

  res.json(filtered);
});

// POST /api/forum - Add question
router.post("/", async (req, res) => {
  const { title } = req.body;
  const q = new Question({ title });
  await q.save();
  res.json(q);
});

// POST /api/forum/:id/answer - Add answer
router.post("/:id/answer", async (req, res) => {
  const { text } = req.body;
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).json({ error: "Question not found" });

  question.replies.push({
    user: "anonymous",
    text,
    time: "just now",
  });
  question.answers += 1;
  await question.save();

  res.json(question);
});

module.exports = router;