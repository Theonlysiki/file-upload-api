const express = require('express');
const { uploadFile } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/upload', uploadFile);

module.exports = router;
