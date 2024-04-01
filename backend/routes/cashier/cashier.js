const express=require('express');
const { handleCashierPage,handleAddNewItem, handleConfirmOrder } = require('../../controllers/cashier/cashier');

const router= express.Router();


router.get('/',handleCashierPage);
router.post('/addNewItem',handleAddNewItem);
router.post('/confirmOrder',handleConfirmOrder);


module.exports= router;