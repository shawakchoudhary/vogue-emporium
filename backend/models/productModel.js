const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
       name : {
           type: String,
           required : [true, "Please Enter Product Name"],
           trim: true
       },
       description: {
           type: String,
           required: [true,"Please Enter Product Description"]
       },
       price:{
           type: Number,
           required:[true,"Please Enter Product Price"],
           maxLength: [8,"Price Cannot exceed 8 figures"]
       },
       ratings:{
           type: Number,
           default: 0
       },
       images:[
        {
            public_id: {
                type: String,
                requied: true
            },
         url: {
             type: String,
             requied: true
            }
        }
       ],
       category:{
           type: String,
           required:[true,"Please Enter Product Category"]
       },
       stock:{
           type: Number,
           required: [true,"Please Enter product stock"],
           maxLength:[4,"Stock cannot exceed 4 figures"],
           default: 1
       },
       numberOfReviews:{
           type: Number,
           default: 0
       },
       reviews:[
           {
               user:{
                   type: mongoose.Schema.ObjectId,
                   ref:"user",
                   required:true,
               },
               name : {
                   type: String,
                   required: true
               },
               rating:{
                   type:Number,
                   required: true
               },
               comment:{
                   type:String,
                   required: true
               }
           }
       ],
       user:{
           type: mongoose.Schema.ObjectId,
           ref:"user",
           required:true,
       },
       createdAt:{
           type:Date,
           default: Date.now
       }
})

module.exports = mongoose.model("Product",productSchema);