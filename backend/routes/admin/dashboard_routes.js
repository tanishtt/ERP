const express= require('express');
const router= express.Router();

const {getSalesCounts}= require('../../controllers/admin/sales')
const {getCustomerCounts}= require('../../controllers/admin/customer')


// router.get('/',x);
router.get('/api/sales',getSalesCounts);
router.get('/api/customers',getCustomerCounts);


module.exports= router;