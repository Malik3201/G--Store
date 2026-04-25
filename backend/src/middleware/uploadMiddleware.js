const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/products';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only! Allowed types: jpeg, jpg, png, webp'), false);
  }
};

const multerInstance = multer({ storage, fileFilter });

// Wrap multer in a promise so it works seamlessly with Express 5 async routes
const uploadArray = (fieldName, maxCount) => (req, res, next) => {
  multerInstance.array(fieldName, maxCount)(req, res, (err) => {
    if (err) {
      res.status(400);
      return next(new Error(err.message || 'File upload failed'));
    }
    next();
  });
};

module.exports = { uploadArray };

