const express= require('express');
const router=express.Router();
const {getCustomerCounts,getAllCustomers}= require('../../controllers/admin/customer')


router.get('/',getAllCustomers);

router.get('/api/customers',getCustomerCounts)

module.exports= router;