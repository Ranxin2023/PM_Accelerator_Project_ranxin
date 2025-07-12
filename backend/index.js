
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(express.json());
// console.log(`url is${process.env.MONGO_URI}`)
console.log(`deepseek api is: ${process.env.DEEPSEEK_API}`)
// Connect DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/api/analyze', require('./routes/analyze'));
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/profile', require('./routes/autofill'));
app.use('/api/answers', require('./routes/answers'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/forum', require('./routes/forum'));

app.use('/api/manuallyfill', require('./routes/manuallyfill'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/preference', require('./routes/preference'));
app.use('/api/upload', require('./routes/upload'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
