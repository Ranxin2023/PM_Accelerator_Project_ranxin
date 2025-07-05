const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  company: String,
  jobTitle: String,
  status: String // e.g., 'Submitted', 'Interview', 'Rejected'
});

module.exports = mongoose.model('Application', ApplicationSchema);
