const express=require('express');

const {handleSignUp} =require('../../authentication/auth/signup')
const{handleSignIn} =require('../../authentication/auth/signin')
const bcrypt= require('bcrypt');
const {authenticateUser} = require('../../authentication/middlewares/auth')

const router= express.Router();

const allAdminRoutes= require('./admin_routes')


// router.use('/',authenticateUser, allAdminRoutes);
router.use('/', allAdminRoutes);


router.post('/signup',handleSignUp);
router.post('/login',handleSignIn);
module.exports= router;