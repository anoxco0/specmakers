const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    brand_name:{type:String, required:true},
    model_name:{type:String, required:true},
    type:{type:String, required:true},
    frame_type:{type:String, required:true},
    frame_shape:{type:String, required:true},
    frame_size:{type:String, required:true},
    price:{type:Number, required:true},
    offer_name:{type:String, required:true},
    specifications:[{type:String, required:false}],
    color_options:[
        {
            color:{type:String, required:true},
            side_image:{type:String, required:false},
            front_image:{type:String, required:true}
        }
    ],
    quantity:{type:Number, required:true},
    wishlistCount:{type:Number, required:true},
    purchaseCount:{type:Number, required:true},
    avgRating:{type:Number, required:true},
},{
    versionKey:false,
    timestamps:true,
})

module.exports=mongoose.model('products', productSchema)