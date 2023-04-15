const express=require('express');
const router=express.Router();

const usercontroller=require('../Controllers/users_controller');
router.get('/profile',usercontroller.profile);
router.get('/sign-up',usercontroller.signUp);
router.get('/sign-In',usercontroller.signIn);
router.post( '/create',usercontroller.create);
module.exports=router;