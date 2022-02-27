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

<<<<<<< HEAD
=======
router.get("/:id", async (req,res) =>{
    try{
        const user = await User.findById(req.params.id).lean().exec();
        return res.send(user);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

router.patch("/:id", async (req,res) =>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true});
        return res.send(user);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

router.delete("/:id", async (req,res) =>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        return res.send(user);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})


>>>>>>> 62fda52480ea2b7deae38d3e9009e2e17c6ec42f
module.exports = router;