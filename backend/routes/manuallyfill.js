const express = require("express");
const router = express.Router();
const User = require("../models/User"); // assuming user model stores profile details

router.post("/step1", async (req, res) => {
  const { email, values } = req.body;

  if (!values || !Array.isArray(values) || values.length === 0 || values.length > 3) {
    return res.status(400).json({ message: "Please select up to 3 values." });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { preferences: values } },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Preferences saved", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;