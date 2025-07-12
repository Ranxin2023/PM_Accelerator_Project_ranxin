const express = require("express");
const multer = require("multer");
const axios = require("axios");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const router = express.Router();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Set up file upload using multer
const upload = multer({ dest: "uploads/" });

router.post("/analyze-resume", upload.single("resume"), async (req, res) => {
    console.log("analyzing resume...")
    try {
        const jobDescription = req.body.jobDescription;
        const resumeFile = req.file;

        if (!jobDescription || !resumeFile) {
            return res.status(400).json({ error: "Missing job description or resume." });
        }

        // Step 1: Read and parse the resume (assumes PDF)
        const resumeBuffer = fs.readFileSync(resumeFile.path);
        const parsed = await pdfParse(resumeBuffer);
        const resumeText = parsed.text;

        // Step 2: Craft prompt for GPT
        const prompt = `
You are an AI resume reviewer. Evaluate how well the following resume matches the job description. 
Provide a score out of 100 and give a few sentences explaining the reasoning.

Job Description:
${jobDescription}

Resume:
${resumeText}
        `;

        // Step 3: Call OpenAI's Chat API
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        const gptReply = response.data.choices[0].message.content;

        // Clean up uploaded file
        fs.unlinkSync(resumeFile.path);

        res.status(200).json({ analysis: gptReply });

    } catch (err) {
        console.error("Error analyzing resume:", err.message);
        res.status(500).json({ error: "Failed to analyze resume." });
    }
});

module.exports = router;
