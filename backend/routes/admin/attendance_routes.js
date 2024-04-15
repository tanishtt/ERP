const express = require('express'); 
const router= express.Router();
const {getEmployees} = require('../../controllers/admin/attendance');

router.get('/employee-data',getEmployees);
module.exports=router;