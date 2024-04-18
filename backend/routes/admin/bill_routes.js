const express = require('express');
const upload = require('../../upload');



const router= express.Router();
const {run_gemini}= require('../../controllers/admin/gemini');


router.post('/upload-and-get-gemini-invoice',upload.single("bill-image"),(req, res, next) => {
    console.log('xx',req.headers); // Log request headers
    console.log(req.file); // Log uploaded file information
    next(); // Move to the next middleware
},run_gemini);

module.exports=router;