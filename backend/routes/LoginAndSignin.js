const express=require('express');

const router= express.Router();
const {handleSignUp}=require('../authentication/auth/signup');

router.post('/signup',handleSignUp);



module.exports= router;

