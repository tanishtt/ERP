const express= require('express');
const router= express.Router();


const {getOrderAmountsByYear}= require('../../controllers/admin/graph/sales')



const dashboard= require('./dashboard_routes');
const orders= require('./orders_routes');
const customers= require('./customer_routes');
const products= require('./products_routes');
const expenditure= require('./expenditure_routes');
const addProductsRoute= require('./add_product_routes');
const employees= require('./employees_routes');
const attendance= require('./attendance_routes');
const bill= require('./bill_routes');



router.use('/dashboard',dashboard);
router.use('/products',products);
router.use('/customers',customers);
router.use('/orders',orders);
router.use('/add-product',addProductsRoute);
router.use('/salesGraph',getOrderAmountsByYear);
router.use('/expenditure', expenditure);
router.use('/employees',employees);
router.use('/attendance',attendance);
router.use('/bill',bill);

module.exports= router;