import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
export const verifyJwt=async(req,_,next)=>{
    try {
        const token = req.cookies?.accessToken
        if(!token){
            throw new ApiError(400,"Unauthorized Access")
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_KEY)
        const user = await User.findById(decodedToken?._id).select(["-password -refreshToken"])
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }
        req.user=user
        next()
    } catch (error) {
        throw new ApiError(401, error.message || "Invalid token",error)
    }
}