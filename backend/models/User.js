const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  resume: {
    filename: String,
    data: Buffer,
    contentType: String,
    uploadDate: Date,
  },
});

module.exports = mongoose.model("User", userSchema);