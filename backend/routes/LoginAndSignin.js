const express=require('express');

const router= express.Router();
const {handleSignUp}=require('../authentication/auth/signup');
const {handleSignIn}=require('../authentication/auth/signin');


router.post('/signup',handleSignUp);
router.post('/login',handleSignIn);



module.exports= router;

