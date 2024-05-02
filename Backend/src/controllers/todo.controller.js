import {Todo} from '../models/todo.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import randomColor from 'randomcolor'

const createTodo=async(req,res)=>{
    try {
        const {title}=req.body
        if(!title){
            throw new ApiError(400,"Please provide title")
        }
        const color = randomColor()
        const todo = await Todo.create({title,createdBy:req.user._id,color})
        if(!todo){
            throw new ApiError(500,"Unable to create Todo")
        }
        return res.status(201).json(new ApiResponse(201, "Todo created successfully", todo))
    } catch (error) {
        throw new ApiError(500,"Something went wrong while creating Todo",error)
    }
}
const updateTodo=async(req,res)=>{
    try {
        const {todoid}=req.params
        const {title}=req.body
        if(!title){
            throw new ApiError(400,"Please provide title")
        }
        let todo=await Todo.findById(todoid)
        if (!todo) {
            throw new ApiError(400,"Todo not found")
        }
        //checking user is owner of this todo or not
        if(todo.createdBy.toString()!==req.user._id.toString()){
            throw new ApiError(400,"You are not authorized to update this todo")
        }
        todo=await Todo.findByIdAndUpdate(todoid,{
            $set:{title}
            },{new:true})
        res.status(201).json(new ApiResponse(201,"Todo updated successfully",todo))
    } catch (error) {
        throw new ApiError(500,"Something went wrong while updating",error)

    }
}
const deleteTodo=async(req,res)=>{
    try {
        const {todoid}=req.params
        let todo=await Todo.findById(todoid)
        if (!todo) {
            throw new ApiError(400,"Todo not found")
        }
        //checking user is owner of this todo or not
        if(todo.createdBy.toString()!==req.user._id.toString()){
            throw new ApiError(400,"You are not authorized to delete this todo")
        }
        await todo.remove()
        res.status(200).json(new ApiResponse(200,"Todo deleted successfully"))
    } catch (error) {
        throw new ApiError(500,"Something went wrong while deleting",error)

    }
}

export{
    createTodo,
    updateTodo,
    deleteTodo
}