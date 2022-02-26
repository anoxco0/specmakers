const express = require('express');
const Product = require('../models/products.model');
const router = express.Router();

router.get('/', async(req, res)=>{
    try{
        const product = await Product.find().lean().exec();
        return res.send(product);
    }
    catch(e){
        return res.status(500).send({message:e.message});
    }
})

module.exports=router;