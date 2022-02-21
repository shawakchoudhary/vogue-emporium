const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please Enter your Name"],
        maxLength:[30,"Name Cannot Exceed 30 Characters"],
        minlength:[4,"Name Should Have more than 4 Characters"],
    },
    email:{
        type: String,
        required:[true, "Please Enter your Email"],
        unique: true,
        validate:[ validator.isEmail , "Please Enter a valid Email"]
    },
    password:{
        type: String,
        required:[true ,"Please Enter Your Password"],
        minlength:[8,"Password should be greater than equal to 8 characters"],
        select: false,//is not displayed when find() method will be called
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }

    },
    role:{
        type:String,
        default:"user",
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    resetPasswordToken:String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10)
});

// JWT token (user will not have to login when it register)

userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};


// comparepassword()

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);//comparing password using bcrypt
    };

//Reset Password/generating Reset password Token

userSchema.methods.getResetPasswordToken = function(){
    
    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hashing resetToken using sha256 algo and adding resetPasswordToken to userSchema

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // setting time for resetting the password

    this.resetPasswordExpire = Date.now() +  15*60*1000;

    return resetToken;
};

module.exports = mongoose.model("User", userSchema);