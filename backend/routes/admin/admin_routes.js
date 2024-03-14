const express= require('express');
const router= express.Router();


const {getOrderAmountsByYear}= require('../../controllers/admin/graph/sales')


const dashboard= require('./dashboard_routes');
const orders= require('../admin/orders_routes');
const customers= require('../admin/customer_routes');
const products= require('../admin/products_routes');



router.use('/',dashboard);
router.use('/products',products);
router.use('/customers',customers);
router.use('/orders',orders);
router.use('/salesGraph',getOrderAmountsByYear);

module.exports= router;