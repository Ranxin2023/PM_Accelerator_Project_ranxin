const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route: POST /api/preference
// Description: Update one or more user preference fields
router.post("/", async (req, res) => {
  const { userName, preferences, interestedRoles, desiredLevels } = req.body;

  if (!userName) {
    return res.status(400).json({ message: "Missing userName in request." });
  }

  try {
    const updateFields = {};
    if (preferences) updateFields.preferences = preferences;
    if (interestedRoles) updateFields.interestedRoles = interestedRoles;
    if (desiredLevels) updateFields.desiredLevels = desiredLevels;

    const updatedUser = await User.findOneAndUpdate(
      { userName },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Preferences updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating preferences:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});
router.post('/roles', async (req, res) => {
  const { userName, interestedRoles } = req.body;

  try {
    const user = await User.findOne({ userName });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.interestedRoles = interestedRoles;
    await user.save();

    res.status(200).json({ message: "Roles updated successfully" });
  } catch (err) {
    console.error("Error updating roles:", err);
    res.status(500).json({ error: "Server error" });
  }
});
// GET /api/preference/:userName
router.get("/:userName", async (req, res) => {
  const { userName } = req.params;

  try {
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const preferences = user.preferences || [];
    const interestedRoles = user.interestedRoles || [];
    const interestedLevels = user.interestedLevels || [];

    res.status(200).json({ preferences, interestedRoles, interestedLevels });
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/preference/levels
router.post("/levels", async (req, res) => {
  const { userName, levels } = req.body;

  if (!userName || !Array.isArray(levels)) {
    return res.status(400).json({ error: "Missing userName or levels array" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { userName },
      { interestedLevels: levels },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: "Levels saved", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error saving levels" });
  }
});

module.exports = router;
