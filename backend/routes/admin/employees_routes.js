const express = require('express'); 
const router= express.Router();
const {addEmployee, getEmployees} = require('../../controllers/admin/employees');

router.post('/add-employee',addEmployee);
router.get('/get-employees',getEmployees);

module.exports=router;