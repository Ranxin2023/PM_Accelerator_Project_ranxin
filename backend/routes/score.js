const express = require('express');
const router = express.Router();
const { analyzeResume } = require('../ai/deepseek');

router.post('/analyze', async (req, res) => {
  const { resume, jd } = req.body;
  const result = await analyzeResume(resume, jd);
  res.json(result);
});

module.exports = router;
