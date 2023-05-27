const express=require('express');
const router=express.Router();

const homeController=require('../Controllers/home_controller');
console.log("router loaded");
router.get('/',homeController.home);
//here we are telling  root of routes we will have to tell it list 
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
module.exports=router;