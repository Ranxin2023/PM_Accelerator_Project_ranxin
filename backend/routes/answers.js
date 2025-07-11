const express = require('express');
const axios = require('axios');
const router = express.Router();

// require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

router.post('/generate-answer', async (req, res) => {
  const { question, jobDescription, customPrompt } = req.body;

  const userMessage = customPrompt || 
    `Answer the following job application question based on the job description.\n\nQuestion: ${question}\n\nJob Description:\n${jobDescription}`;

  console.log("📩 Prompt sent to GPT:", userMessage);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: userMessage }],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const botMessage = response.data.choices[0].message.content;
    res.status(200).json({ answer: botMessage });
  } catch (error) {
    console.error("❌ GPT API Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to generate answer" });
  }
});

module.exports = router;
// const express = require("express");
// const router = express.Router();

// // require("dotenv").config({ path: '../../.env' });
// const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API;
// router.post("/generate-answer", async (req, res) => {
  
//   console.log("DeepSeek key:", DEEPSEEK_API_KEY);
//   return res.status(200).json({ message: "Key test", answer: DEEPSEEK_API_KEY });
// });

// module.exports = router;