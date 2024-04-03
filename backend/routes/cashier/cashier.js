const express=require('express');
const { handleCashierPage,handleAddNewItem, handleConfirmOrder } = require('../../controllers/cashier/cashier');
const { handleOrderSubmit } = require('../../controllers/cashier/cashier_order');
const { getProducts, getProductById } = require('../../controllers/cashier/cashier');


const router= express.Router();


// router.get('/',handleCashierPage);
// router.post('/addNewItem',handleAddNewItem);
// router.post('/confirmOrder',handleConfirmOrder);
router.post('/handleOrderSubmit',handleOrderSubmit);

router.get('/get-products',getProducts);
router.get('/get-product-by-id/:productId', getProductById);


module.exports= router;