const ErrorHandler = require("../utils/errorHandler");

module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

   //Wrong mongoDB id error(if the id in the url is wrong)
   //type->castError
   if(err.name === "CastError"){
       const message = `Resource not found. Invalid ${err.path}`;
       err = new ErrorHandler(message,400);
   }

   //Mongoose Duplicate Key error
   if(err.code === 11000){
       const message  = `Duplicate ${Object.keys(err.keyValue)} Entered`;
       err = new ErrorHandler(message, 400);
   }

   //Wrong JWT error
   if(err.name === "JsonWebTokenError"){
       const message = `Json web Token is Invalid, Try Again`;
       err = new ErrorHandler(message, 400);
   }

   //JWT Expire Error
   if(err.name === "TokenExpiredError"){
       const message = `Json Web Token Expired, Try again`;
       err= new ErrorHandler(message, 400);
   }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

//To handle request Error When Product is not found 