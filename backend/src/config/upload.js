const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { randomUUID } = require('crypto');

const uploadDirectory = path.resolve(__dirname, '..', '..', 'uploads', 'resumes');

fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${randomUUID()}${fileExtension}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    return cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
  }

  return cb(null, true);
};

const uploadResume = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

module.exports = {
  uploadResume,
  uploadDirectory,
};
