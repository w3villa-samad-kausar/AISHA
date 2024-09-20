const express=require("express");
const imageGenerator = require("../controllers/imageGenerator");
const router=express.Router();

router.post('/image-generator',imageGenerator)

module.exports=router;