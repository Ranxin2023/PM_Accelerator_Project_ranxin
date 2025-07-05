const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  workHistory: String,
  education: String
});

module.exports = mongoose.model('User', UserSchema);
