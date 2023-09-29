require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/files', fileRoutes);
app.listen(3000, () => console.log('Server is running on port 3000'));
