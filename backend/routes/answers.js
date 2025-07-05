const express = require('express');
const router = express.Router();
const { generateAnswers } = require('../ai/deepseek');

router.post('/generate', async (req, res) => {
  const { profile, jd } = req.body;
  const result = await generateAnswers(profile, jd);
  res.json({ answer: result });
});

module.exports = router;
