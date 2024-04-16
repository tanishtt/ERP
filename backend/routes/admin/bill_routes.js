const express = require('express');
const multer = require('multer');



const router= express.Router();
const {run_gemini}= require('../../controllers/admin/gemini');

// Set up Multer storage for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Specify the destination directory here
  },
  filename: function (req, file, cb) {
    // Generate a unique file name here if needed
    cb(null, file.originalname)
  }
});
const upload = multer({ storage });


router.post('/upload-and-get-gemini-invoice',upload.single("bill-image"),run_gemini);

module.exports=router;