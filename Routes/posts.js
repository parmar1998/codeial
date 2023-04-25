const express=require('express');
const router=express.Router();
const postController=require('../Controllers/postscontroller');
router.post('/create',postController.create);
module.exports=router;