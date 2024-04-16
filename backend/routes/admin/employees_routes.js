const express = require('express'); 
const router= express.Router();
const {addEmployee, getEmployees, updateEmployee, deleteEmployee} = require('../../controllers/admin/employees');

router.post('/add-employee',addEmployee);
router.get('/get-employees',getEmployees);
router.post('/update-employees/:id',updateEmployee);
router.delete('/delete-employees/:id',deleteEmployee);

module.exports=router;