const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  school: String,
  degree: String,
  startDate: String,
  endDate: String,
  gpa: String,
});

const experienceSchema = new mongoose.Schema({
  jobTitle: String,
  company: String,
  startDate: String,
  endDate: String,
  description: {
    type: [String],
    default: [],
  },
});

const publicationSchema = new mongoose.Schema({
  title: String,
  authors: String,
  journal: String,
  year: String,
  pages: String,
});

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  resume: {
    filename: String,
    data: Buffer,
    contentType: String,
    uploadDate: Date,
  },
  preferences: [String],
  interestedRoles: [String],
  desiredLevels: [String],
  education: [educationSchema],
  experience: [experienceSchema],
  publications: [publicationSchema],
});

module.exports = mongoose.model("User", userSchema);
