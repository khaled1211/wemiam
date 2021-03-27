const express = require('express');
const router= express.Router();
const apiRoute=require('./todo');
router.use('/todo',apiRoute);
module.exports=router;