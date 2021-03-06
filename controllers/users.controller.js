require("dotenv").config();
const express = require('express');
const User = require('../models/users.model')
const router = express.Router();

router.get("", async (req,res) =>{
    try{
        const user = await User.find().lean().exec();
        return res.send(user);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})
module.exports = router;