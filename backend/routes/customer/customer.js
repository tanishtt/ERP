const express=require('express');
const {handleCustomerPage, handleOrderSubmit, getProducts,
    getProductById,
    getProductsByCategoryId
} = require('../../controllers/customer/customer')
const router= express.Router();
const {handlePayment}= require('../../controllers/payments/payment')


// router.get('/',handleCustomerPage);
router.get('/get-products',getProducts);
router.get('/get-product-by-id/:productId', getProductById);
router.get('/get-category-by-id/:categoryId', getProductsByCategoryId);


 router.post('/orderSubmit', handleOrderSubmit);
// router.post('/payment',handlePayment);
router.post('payment/create-order',)



module.exports= router;