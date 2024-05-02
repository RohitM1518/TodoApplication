import {User} from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

    const cookiesOptions={
        HttpOnly:true,
        secure:false
    }

const generateRefreshAndAccessToken=async(userid)=>{
    try {
        const user = await User.findById(userid)
        if(!user){
            throw new ApiError(400,"No user found")
        }
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Error While generating Access Token and Refresh token",error)
    }
}

const createUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            throw new ApiError(400,"Please provide all the details")
        }
        const existinguser = await User.findOne({email:email})
        // console.log("exissting user ",existinguser)
        if(existinguser){
            throw  new ApiError(400,"User already exists")
        }
        
        const user = await User.create({name,email,password})
        const createdUser = await User.findById(user._id).select('-password -refreshToken')
        if(!createdUser){
            throw new ApiError(400,"Something went wrong while creating user")
        }
        const {refreshToken, accessToken}=await generateRefreshAndAccessToken(createdUser._id)
        return res
        .cookie("accessToken", accessToken,cookiesOptions)
        .cookie("refreshToken", refreshToken,cookiesOptions)
        .status(201).json(new ApiResponse(201,"User created successfully",createdUser))
    } catch (error) {
        throw new ApiError(500,"Something went wrong while creating user",error)
        
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            throw new ApiError(400,"Please provide all the details")
        }
        const user = await User.findOne({email:email}).select("-refreshToken")
        if(!user){
            throw  new ApiError(400,"User does not exists")
        }
        const validPassword= await user.checkPassword(password)
        if(!validPassword){
            throw new ApiError(400,"Wrong password")
        }
        user.password=undefined
        const {refreshToken, accessToken}=await generateRefreshAndAccessToken(user._id)
        return res
        .cookie("accessToken", accessToken,cookiesOptions)
        .cookie("refreshToken", refreshToken,cookiesOptions)
        .status(201).json(new ApiResponse(201,"User created successfully",user))
    } catch (error) {
        throw new ApiError(500,"Something went wrong while logging in",error)
    }
}

const logout=async(req,res)=>{
    try {
        const user= req.user
        await User.findByIdAndUpdate(user._id,{
            $unset:{
                refreshToken:1
            }
        },{
            new:true
        })
        return res
        .status(200)
        .clearCookie("accessToken",cookiesOptions)
        .clearCookie("refreshToken",cookiesOptions)
        .json(new ApiResponse(200,"Sucessfully Logged out"))

    } catch (error) {
        throw new ApiError(500, "Something went wrong while logging out",error)
    }
}

export{
    createUser,
    login,
    logout
}