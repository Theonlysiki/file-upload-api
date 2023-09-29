const multer = require('multer');
const AWS = require('aws-sdk');
const File = require('../models/fileModel');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.uploadFile = (req, res) => {
  const uploadSingle = upload.single('file');
  uploadSingle(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });
    
    const file = req.file;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };
    
    try {
      const uploaded = await s3.upload(params).promise();
      
      const newFile = new File({
        filename: params.Key,
        mimetype: file.mimetype,
        url: uploaded.Location
      });
      
      await newFile.save();
      res.status(201).json(newFile);
    } catch (error) {
      res.status(500).send(error);
    }
  });
};
