const express=require('express');
const router=express.Router();
console.log("router loaded");
const homeController=require('../Controllers/home_controller')
router.get('/',homeController.home);
//here we are telling  root of routes we will have to tell it list 
router.use('/users',require('./users'))
module.exports=router;