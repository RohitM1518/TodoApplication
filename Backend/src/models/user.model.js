import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String,
    },
},{timestamps:true})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.checkPassword= async function(password){
    console.log("password",password);
    console.log("this.password",this.password);
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=async function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        name:this.name,
    },process.env.ACCESS_TOKEN_KEY,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken=async function(){
    return jwt.sign({
        _id:this._id,
    },process.env.REFRESH_TOKEN_KEY,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const User = mongoose.model("User",userSchema)