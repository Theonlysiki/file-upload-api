const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  filename: String,
  mimetype: String,
  path: String
});

const File = mongoose.model('File', FileSchema);
module.exports = File;
