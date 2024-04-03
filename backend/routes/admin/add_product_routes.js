const express= require('express');
const router= express.Router();

const{handleCategoryDropDown}= require('../../controllers/admin/categories')

router.get('/api/category',handleCategoryDropDown);


module.exports= router;