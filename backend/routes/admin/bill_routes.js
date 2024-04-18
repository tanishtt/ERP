const express = require('express');
const multer = require('multer');



const router= express.Router();
const {run_gemini}= require('../../controllers/admin/gemini');
const path = require('path');
// Set up Multer storage for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(path.resolve(__dirname, 'uploads'));
    cb(null, path.resolve(__dirname, 'uploads')); // Specify the destination directory here
  },
  filename: function (req, file, cb) {
    // Generate a unique file name here if needed
    cb(null, file.originalname)
  }
});
const upload = multer({ storage });


router.post('/upload-and-get-gemini-invoice',upload.single("bill-image"),(req, res, next) => {
    console.log(req.headers); // Log request headers
    console.log(req.file); // Log uploaded file information
    next(); // Move to the next middleware
},run_gemini);

module.exports=router;