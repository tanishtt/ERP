const express=require('express');
const {handleCustomerPage, handleOrderSubmit, getProducts} = require('../../controllers/customer/customer')
const router= express.Router();
const {handlePayment}= require('../../controllers/payments/payment')


// router.get('/',handleCustomerPage);
router.post('/',getProducts);
// router.post('/orderSubmit', handleOrderSubmit);
// router.post('/payment',handlePayment);




module.exports= router;