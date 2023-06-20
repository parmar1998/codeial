const express = require('express');
const router = express.Router();
const userApi=require('../../../Controllers/api/v1/users_api');
router.post('/create-session',userApi.createSession);
module.exports=router;