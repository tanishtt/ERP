const express=require('express');
const { handleCashierPage,handleAddNewItem, handleConfirmOrder } = require('../../controllers/cashier/cashier');
const { handleOrderSubmit } = require('../../controllers/cashier/cashier_order');

const router= express.Router();


// router.get('/',handleCashierPage);
// router.post('/addNewItem',handleAddNewItem);
// router.post('/confirmOrder',handleConfirmOrder);
router.post('/handleOrderSubmit',handleOrderSubmit);

module.exports= router;