require("dotenv").config();
const express = require('express')
const path = require('path')
const connect = require('./configs/db');
const userController = require('./controllers/users.controller');
const User = require('./models/users.model');
const {register, login, registeradmin} = require('./controllers/auth.controller');
const productController = require('./controllers/products.controller');
const {body, validationResult} = require('express-validator');

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());


app.use(express.urlencoded({extended: true }))

app.use('/register', userController);
app.use('/login', userController);
app.use('/users', userController);
app.use('/products', productController);

app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'ejs')
app.post('/register', 
body('full_name').isLength({min:5}).withMessage("name should be greater than 2 characters!"),
body("email").isEmail().withMessage('eamil should be a valid email address!').bail()
.custom(async(value)=>{
    const user = await User.findOne({email:value});
    if(user) throw new Error('email already exists!')
    return true;
}),

body('password').isStrongPassword()
.withMessage('try strong password that have a combination of upercase alphabet, lowercase alphabet, special characters, number and must be gretaer than 8 character!'),
 register);

 app.post('/adminanoxco0', 
body('full_name').isLength({min:3}).withMessage("name should be greater than 2 characters!"),
body("email").isEmail().withMessage('eamil should be a valid email address!').bail()
.custom(async(value)=>{
    const user = await User.findOne({email:value});
    if(user) throw new Error('email already exists!')
    return true;
}),
body('password').isStrongPassword()
.withMessage('try strong password that have a combination of upercase alphabet, lowercase alphabet, special characters, number and must be greater than 8 character!'),
 registeradmin);

app.post('/login', login)




app.get('/', (req, res) => res.render('pages/index'))

const port = process.env.PORT || 8252

app.listen(port, async()=>{
    try{
        await connect();
        console.log(`listening on port ${port} ....`)
    } catch(e){
        console.log({message:e.message});
    }
})