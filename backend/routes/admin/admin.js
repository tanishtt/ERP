const express=require('express');

const {handleSignUp} =require('../../authentication/auth/signup')
const{handleSignIn} =require('../../authentication/auth/signin')
const bcrypt= require('bcrypt');
const {authenticateUser} = require('../../authentication/middlewares/auth')
const{handleCategoryDropDown}= require('../../controllers/admin/categories')

const router= express.Router();

const allAdminRoutes= require('./admin_routes')


router.use('/',authenticateUser, allAdminRoutes);
router.get('/api/add-product/category',handleCategoryDropDown);


router.post('/signup',handleSignUp);
router.post('/login',handleSignIn);
module.exports= router;