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

// router.post('/', async(req, res)=>{
//     try{
//         console.log(req.query)
//         const product = await Product.create(req.body);
//         return res.send(product);
//     }
//     catch(e){
//         return res.status(500).send({message:e.message});
//     }
// })

// router.patch('/:id', async(req, res)=>{
//     try{
//         console.log(req.query)
//         const product = await Product.findByIdAndUpdate(req.params.id , req.body ,{
//             new:true
//         });
//         return res.send(product);
//     }
//     catch(e){
//         return res.status(500).send({message:e.message});
//     }
// })


// router.delete('/:id', async(req, res)=>{
//     try{
//         console.log(req.query)
//         const product = await Product.findByIdAndDelete(req.params.id);
//         return res.send(product);
//     }
//     catch(e){
//         return res.status(500).send({message:e.message});
//     }
// })


// router.get('/:id', async(req, res)=>{
//     try{
//         console.log(req.query)
//         const product = await Product.findOne(req.params.id).lean().exec();
//         return res.send(product);
//     }
//     catch(e){
//         return res.status(500).send({message:e.message});
//     }
// })


module.exports=router;