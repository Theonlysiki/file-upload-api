const express = require('express');
const { uploadFile } = require('../middleware/uploadMiddleware');
const File = require('../models/fileModel');

const router = express.Router();

router.post('/upload', uploadFile);

router.get('/play/:filename', async (req, res) => {
  try {
    const file = await File.findOne({ filename: req.params.filename });
    if (!file) return res.status(404).send('File not found');

    res.render('videoPlayer', { url: file.url });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
