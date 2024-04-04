const express= require('express');
const router= express.Router();

const{handleCategoryDropDown}= require('../../controllers/admin/categories')
const {handleAddProduct}= require('../../controllers/admin/products')


router.get('/api/category-drop-down',handleCategoryDropDown);
router.post('/submit-product',handleAddProduct);

module.exports= router;