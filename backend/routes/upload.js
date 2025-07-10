const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const User = require("../models/User");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    const { userName } = req.body;
    const file = req.file;

    if (!file || !userName) {
      return res.status(400).json({ message: "Missing file or user email." });
    }

    const user = await User.findOne({ userName });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Parse PDF content using pdf-parse
    const pdfText = await pdfParse(file.buffer);
    const extractedText = pdfText.text;

    // Optional: try to extract basic info using regex
    const nameMatch = extractedText.match(/Name:\s*(.*)/i);
    const phoneMatch = extractedText.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    const emailMatch = extractedText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
    const education = extractEducation(extractedText);
    const experience = extractExperience(extractedText);
    const publications = extractPublications(extractedText);
    user.resume = {
      filename: file.originalname,
      data: file.buffer,
      contentType: file.mimetype,
      uploadDate: new Date(),
    };

    user.firstName = nameMatch ? nameMatch[1].split(" ")[0] : user.firstName;
    user.lastName = nameMatch ? nameMatch[1].split(" ")[1] : user.lastName;
    user.phone = phoneMatch ? phoneMatch[0] : user.phone;
    user.email = emailMatch ? emailMatch[0] : user.email;
    user.education = education;
    user.experience = experience;
    user.publications = publications;

    await user.save();

    res.status(200).json({
      message: "Resume uploaded and user updated.",
      extracted: {
        name: `${user.firstName} ${user.lastName}`,
        phone: user.phone,
        email: user.resumeEmail,
      },
    });
  } catch (err) {
    console.error("Server Error", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
function extractEducation(text) {
  const regex = /(?<=Education[\s\S]{0,50})((.|\n){0,500})/i;
  const match = text.match(regex);
  return match ? [{ school: match[0].split("\n")[0] }] : [];
}

function extractExperience(text) {
  const regex = /(?<=Experience[\s\S]{0,50})((.|\n){0,700})/i;
  const match = text.match(regex);
  return match ? [{ jobTitle: match[0].split("\n")[0] }] : [];
}

function extractPublications(text) {
  const regex = /(?<=Publications[\s\S]{0,50})((.|\n){0,500})/i;
  const match = text.match(regex);
  return match ? [{ title: match[0].split("\n")[0] }] : [];
}
module.exports = router;
