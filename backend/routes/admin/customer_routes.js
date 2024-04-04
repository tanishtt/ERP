const express= require('express');
const router=express.Router();
const {getCustomerCounts,getAllCustomers}= require('../../controllers/admin/customer')


router.get('/get-all-customers',getAllCustomers);

router.get('/api/customers',getCustomerCounts)

module.exports= router;