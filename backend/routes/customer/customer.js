const express=require('express');
const {handleCustomerPage, handleOrderSubmit, getProducts} = require('../../controllers/customer/customer')
const router= express.Router();
const {handlePayment}= require('../../controllers/payments/payment')


// router.get('/',handleCustomerPage);
router.get('/get-products',getProducts);
// router.post('/orderSubmit', handleOrderSubmit);
// router.post('/payment',handlePayment);
router.post('payment/create-order',)



module.exports= router;