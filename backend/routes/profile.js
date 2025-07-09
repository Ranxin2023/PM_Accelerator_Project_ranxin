const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Save Step 1 (basic profile info)
router.post("/save-basic-info", async (req, res) => {
  const { userName, firstName, lastName, email, phone } = req.body;

  if (!userName) return res.status(400).json({ message: "Missing userName for identification." });

  try {
    const updatedUser = await User.findOneAndUpdate(
      { userName },
      {
        $set: {
          firstName,
          lastName,
          email, // application email
          phone,
        },
      },
      { new: true, upsert: false, strict: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User basic info updated successfully.", user: updatedUser });
  } catch (error) {
    console.error("Failed to update user basic info:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/save-profile-details", async (req, res) => {
  const { userName, education, experience, publications } = req.body;

  if (!userName) {
    return res.status(400).json({ message: "Missing userName" });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { userName },
      { education, experience, publications },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile details updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
