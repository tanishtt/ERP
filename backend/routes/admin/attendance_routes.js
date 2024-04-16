const express = require('express'); 
const router= express.Router();
const {getEmployees,getAttendance} = require('../../controllers/admin/attendance');

router.get('/get-employee-data',getEmployees);
router.get('/get-attendance-data',getAttendance);

module.exports=router;