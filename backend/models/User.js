import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        validate : [validator.isEmail, "Enter a valid email"]
    },
    phone : {
        type : String,
        required : true,
    },
    userName : {
        type : String,
        required : true,
        enum : ["Male", "Female"]
    },
    password : {
        type : String,
        required : true,
        select : false,
    },
   
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password ,10);
});

userSchema.methods.comparePasswords = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id : this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn : process.env.JWT_EXPIRES,
    });
};


export const User = mongoose.model("User", userSchema);