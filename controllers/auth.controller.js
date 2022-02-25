const {body, validationResult} = require('express-validator');
const alert = require('alert')
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const path = require('path');
const { toPath } = require('lodash');
const newToken = (user)=>{
    return jwt.sign({user}, process.env.JWT_SECRET_KEY);
}

const login= async(req, res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user) {
            return res.render("users/login.ejs",{error:error})
        } 
        
        const match = user.checkPassword(req.body.password);
        if(!match) {
            error = 'invalid username or password'
            return res.render("users/login.ejs",{error})
        } 
        const token = newToken(user);
       

        dir_name = path.normalize(`${__dirname}/..`)
        let Path = path.join(dir_name+'/public/index.html')

        // let Path = path.join(dir_name+'/views/users/redirect.ejs')
        const [username, type] = [user.full_name, user.type]
         res.send({user, token});
        // return res.sendFile(Path, {username:username, type:type});
        // return res.render(Path, {username:username, type:type});
    } catch(e){
        return res.status(500).send({message:e.message});
    }
}

const register = async(req, res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        res.send(errors.array());
        }
        await User.create({
            full_name:req.body.full_name,
            email:req.body.email,
            password:req.body.password,
            type:"customer"
        })
        const user = await User.findOne({email:req.body.email}).lean().exec();
        const token = newToken(user) 
        res.send({user, token});
        // return res.render("users/login.ejs",{user});
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