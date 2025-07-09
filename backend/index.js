
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(express.json());
console.log(`url is${process.env.MONGO_URI}`)
// Connect DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/autofill'));
app.use('/api/upload', require('./routes/upload'));
// app.use('/api/resume', require('./routes/score'));
// app.use('/api/answers', require('./routes/answers'));
app.use('/api/applications', require('./routes/dashboard'));
app.use('/api/manuallyfill', require('./routes/manuallyfill'));
app.use('/api/profile', require('./routes/profile'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
