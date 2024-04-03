const express= require('express');
const router=express.Router();
const {handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleGetAllProducts}= require('../../controllers/admin/products')
const { exportToExcelProducts}= require('../../controllers/admin/exporttoexcel')


router.get('/get-products',handleGetAllProducts);

// Route for adding a product
router.post('/add-product', handleAddProduct);

// Route for updating a product
router.put('/update-product/:product_id', handleUpdateProduct);



// Route for deleting a product
router.delete('/delete-product/:product_id', handleDeleteProduct);

//router.get('/api/orders',getOrderCounts)

router.get('/export-to-excel',exportToExcelProducts);


module.exports= router;