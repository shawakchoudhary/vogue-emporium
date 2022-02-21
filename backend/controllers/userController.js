const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const Product = require("../models/productModel")
const sentToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//register a User

exports.registerUser = catchAsyncError(async(req,res,next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop:"scale",
    });

    const {name,email,password} = req.body;
   
    const user = await User.create({
        name,
        email,
        password,
       avatar:{
        public_id:myCloud.public_id,
        url: myCloud.secure_url,
        },
    });

    sentToken(user,201, res);
});

//login User

exports.loginUser = catchAsyncError( async (req,res,next)=>{

    const {email, password} = req.body;

    //if user have submit both email and password

    if(!email || !password){
        return next(new ErrorHandler("please Enter Email & password", 400));
    }

    const user = await User.findOne({email }).select("+password"); 

    if(!user){
        return next(new ErrorHandler("Invalid Email or password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or password1",401));
    }
    sentToken(user,200,res);

});

// logout  User

exports.logout = catchAsyncError( async(req,res,next)=>{

     res.cookie("token", null,{
         expires: new Date(Date.now()),
         httpOnly: true,
     });

    res.status(200).json({
        success: true,
        message:"Logged Out"
    });
});

//forgotPassword

exports.forgotPassword = catchAsyncError( async(req,res,next)=>{
    const user = await User.findOne({email : req.body.email});//getting email from user to send reset Token

    if(!user){
        return next(new ErrorHandler("User not Found", 404));
    }

    //Get ResetPassword Token
   const resetToken =  user.getResetPasswordToken();

    //Saving  resetPasswordToken ,resetPasswordExpire in user model
   await user.save({validateBeforeSave: false}); 
   
   const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

   const message = `Your Password Reset Token is :- \n\n ${resetPasswordUrl}\n\n If you have not required this email then,Please ignore it`;
   
   try {

    await sendEmail({
        email:user.email,
        subject:`Vogue-Emporium Password Recovery`,
        message,

    });
    res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
    })
       
   } catch (error) {
     user.resetPasswordToken = undefined;
     user.resetPasswordExpire = undefined;  
     await user.save({validateBeforeSave: false}); //

     return next( new ErrorHandler(error.message, 500));
   }
});


//for resetting the password
exports.resetPassword = catchAsyncError(async (req,res,next)=>{

     const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

     const user = await User.findOne({
         resetPasswordToken,
         resetPasswordExpire:{$gt: Date.now()},
     });

     if(!user){
         return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400));
     }

     if(req.params.password !== req.params.confirmPassword){
         return next(new ErrorHandler("password Does not Match",400));
     }

     user.password = req.body.password;
     user.resetPasswordToken = undefined;
     user.resetPasswordExpire  = undefined;

    const PasswordUpdated = await user.save();
       PasswordUpdated;

     sentToken(user,200,res);
});

//Get User Details

exports.getUserDetails = catchAsyncError( async(req, res, next)=>{

    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
});

//update user Password

exports.updatePassword = catchAsyncError( async(req, res, next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("old Password is not correct",400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return nexy(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sentToken(user,200,res);
});

//Update User Profile

exports.updateProfile = catchAsyncError( async(req, res, next)=>{
    
   const newUserData = {
       name : req.body.name,
       email: req.body.email,
   };

  if(req.body.avatar !== ""){
      const user = await User.findById(req.user.id);
      const imageId = user.avatar.public_id;
      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop:"scale",
    });

    newUserData.avatar = {
        public_id : myCloud.public_id,
        url: myCloud.url,
    }

  }

   const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
       new: true,
       runValidators: true,
       userFindAndModify: false,
   });
    
   res.status(200).json({
       success: true,
   });
});

//Get All Users (By Admin)

exports.getAllUsers = catchAsyncError(async (req,res,next)=>{
    const users = await User.find();


    res.status(200).json({
        success: true,
        users
    });
});

//Get User Profile (By Admin)

exports.getSingleUser = catchAsyncError( async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User Does Not Exist with id ${req.params.id}`,400));
    }

    res.status(200).json({
        success: true,
        user
    });
});


//Update role( user to admin) --Admin
exports.updateUserRole = catchAsyncError( async(req, res, next)=>{
    
    const newUserData = {
        name : req.body.name,
        email: req.body.email,
        role : req.body.role,
    };
 
   await User.findByIdAndUpdate(req.params.id, newUserData,{
        new: true,
        runValidators: true,
        userFindAndModify: false,
    });
     
    res.status(200).json({
        success: true,
    });
 });

//Delete User --Admin

exports.deleteUser = catchAsyncError(async (req,res,next)=>{

    const user = await User.findById(req.params.id);

   

    if(!user){
        return next(new ErrorHandler(`User Does Not Exist with id ${req.params.id}`,400));
    }

    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
     
    await user.remove();

    res.status(200).json({
        success: true,
        message:"User Deleted Successfully"
    });

});


//Create New Review or Update review

exports.createProductReview = catchAsyncError( async (req,res,next)=>{
 
    const {rating , comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    //Searching if user has already reviewed the product before
    const isReviewed = product.reviews.find((rev)=> rev.user.toString() === req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach(rev=>{
        if(rev.user.toString() === req.user._id.toString())
         (rev.rating = rating), (rev.comment = comment);
        });

    }else{
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length;
    }
     
    let avg = 0
     product.reviews.forEach((rev)=>{
        avg += rev.rating;
    });
    
    product.ratings = avg/product.reviews.length;

    await product.save({
        validateBeforeSave:false
    });

    res.status(200).json({
        success: true,
    });
});

