const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Application = require("../models/Application");

// Route to create a new job application
router.post("/", async (req, res) => {
  const { userName, title, company, location, salary, type, status, description } = req.body;

  if (!userName) {
    return res.status(400).json({ message: "Missing userName" });
  }

  try {
    // Find the user by userName
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new job application linked to the user's ObjectId
    const newApplication = new Application({
      title,
      company,
      location,
      salary,
      type,
      status,
      description,
      userId: user._id,
    });

    await newApplication.save();

    res.status(201).json({ message: "Job application saved", job: newApplication });
  } catch (err) {
    console.error("Error saving job application:", err);
    res.status(500).json({ message: "Failed to save job", error: err.message });
  }
});

// Route to fetch all job applications for a given user
router.get("/:userName", async (req, res) => {
  const { userName } = req.params;

  try {
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const applications = await Application.find({ userId: user._id });

    res.status(200).json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Failed to fetch applications", error: err.message });
  }
});

module.exports = router;
