const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  phone: String,
  email: String,
  resume: {
    filename: String,
    data: Buffer,
    contentType: String,
    uploadDate: Date,
  },

  preferences: [String],

  education: [
    {
      school: String,
      degree: String,
      startDate: String,
      endDate: String,
      gpa: String,
    },
  ],

  experience: [
    {
      title: String,
      company: String,
      startDate: String,
      endDate: String,
      description: [String],
    },
  ],

  publications: [
    {
      title: String,
      authors: String,
      venue: String,
      year: String,
      pages: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
