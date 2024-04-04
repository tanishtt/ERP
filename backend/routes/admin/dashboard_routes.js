const express= require('express');
const router= express.Router();

const {getSalesCounts}= require('../../controllers/admin/sales')
const {getCustomerCounts}= require('../../controllers/admin/customer')
const {getOrderAmountsByYear}=require('../../controllers/admin/graph/sales')

// router.get('/',x);
router.get('/api/sales',getSalesCounts);
router.get('/api/customers',getCustomerCounts);

//graph
router.get('/api/graph/sales', getOrderAmountsByYear);

module.exports= router;