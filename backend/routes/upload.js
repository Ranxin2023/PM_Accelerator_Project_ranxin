const express = require("express");
const multer = require("multer");
const User = require("../models/User");

const router = express.Router();

// Memory storage for resume file
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/upload-resume
router.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    const { email } = req.body;
    const file = req.file;

    if (!file || !email) {
      return res.status(400).json({ message: "Missing file or user email." });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Store resume data in user document
    user.resume = {
      filename: file.originalname,
      data: file.buffer,
      contentType: file.mimetype,
      uploadDate: new Date(),
    };

    await user.save();
    res.status(200).json({ message: "Resume uploaded and saved to user." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
