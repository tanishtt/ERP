const express= require('express');
const router=express.Router();
const {getOrderCounts,getAllOrders}= require('../../controllers/admin/orders')
const {exportToExcelOrders}= require('../../controllers/admin/exporttoexcel')

router.get('/',getAllOrders);

router.get('/api/orders',getOrderCounts)

router.get('/export-to-excel',exportToExcelOrders);

module.exports= router;