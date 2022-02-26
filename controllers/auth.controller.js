require("dotenv").config()
const {body, validationResult} = require('express-validator');

const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const path = require('path');
const { toPath } = require('lodash');
const newToken = (user)=>{
    return jwt.sign({user}, "shhhhh");
}

const login= async(req, res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user) {
            // return res.render("users/login.ejs",{error:error})
            return res.send("{error}")
        } 
        
        const match = user.checkPassword(req.body.password);
        if(!match) {
            error = 'invalid username or password'
            // return res.render("users/login.ejs",{error})
            return res.send("error")
        } 
        // const token = newToken(user);
        return res.send({user, token});

    } catch(e){
        return res.status(500).send({message:e.message});
    }
}

const register = async(req, res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        return res.send(errors.array());
        
        }
        await User.create({
            full_name:req.body.full_name,
            email:req.body.email,
            password:req.body.password,
            type:"customer"
        })
        const user = await User.findOne({email:req.body.email}).lean().exec();
        // const token = newToken(user) 
        // console.log(user, token);
        res.send({user, token});
    } catch(e){
        return res.status(500).send({message:e.message});
    }
}

const registeradmin = async(req, res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        await User.create(req.body)
        const user = await User.findOne({email:req.body.email}).lean().exec();
        const token = newToken(user) 
        return res.send(user);
        // return res.render("users/login.ejs",{user});
    } catch(e){
        return res.status(500).send({message:e.message});
    }
}

module.exports = {register, login, registeradmin};