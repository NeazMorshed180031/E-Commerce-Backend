const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middleware/auth");

//controller

const {upload,remove}=require('../controller/cloudinary')

//
router.post('/uploadImages',authCheck,adminCheck,upload)
router.post('/removeImages',authCheck,adminCheck,remove)

module.exports=router