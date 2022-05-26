const express = require('express');
const Product = require('../models/products.model');
const router = express.Router();

router.get('/', async(req, res)=>{
    try{
        console.log(req.query)
        const product = await Product.find(req.query).lean().exec();
        return res.send(product);
    }
    catch(e){
        return res.status(500).send({message:e.message});
    }
})


module.exports=router;