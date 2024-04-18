const multer = require('multer');


const path = require('path');
// Set up Multer storage for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //console.log(path.resolve(__dirname, 'uploads'));
    cb(null, path.resolve(__dirname, 'uploads')); // Specify the destination directory here
  },
  filename: function (req, file, cb) {
    // Generate a unique file name here if needed
    cb(null, Date.now()+'-'+file.originalname)
  }
});
const upload = multer({ storage });

module.exports = upload;