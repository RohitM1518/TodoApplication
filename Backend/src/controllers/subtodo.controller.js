import { SubTodo } from '../models/sub_todo.model.js'
import { Todo } from '../models/todo.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import mongoose from 'mongoose' 

const createSubTodo = async (req, res) => {
    try {
        const {todoid}=req.params
        const { title, content } = req.body
        if (!title || !content) {
            throw new ApiError(400, "Please provide title and Content")
        }
        const todo = await Todo.findById(todoid)
        if(!todo){
            throw new ApiError(400,"Todo not found")
        }   
        if(todo.createdBy.toString()!==req.user._id.toString()){
            throw new ApiError(400,"You are not authorized to Create this SubTodo")
        }
        const subtodo = await SubTodo.create({ title, content })
        if (!subtodo) {
            throw new ApiError(500, "Unable to create Todo")
        }
        await Todo.findByIdAndUpdate(todoid, { $push: { subTodos: subtodo._id } })   
        return res.status(201).json(new ApiResponse(201, "Todo created successfully", subtodo))
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating SubTodo", error)
    }
}
const updateSubTodo = async (req, res) => {
    try {
        const { subtodoid } = req.params
        const { todoid } = req.params
        const { title,content } = req.body
        if (!title && !content) {
            throw new ApiError(400, "Please provide title or content")
        }
        let subtodo = await SubTodo.findById(subtodoid)
        if (!subtodo) {
            throw new ApiError(400, "SubTodo not found")
        }
        //checking user is owner of this todo or not

        const todo = await Todo.findById(todoid)
        if(!todo){
            throw new ApiError(400,"Todo not found")
        }   
        if(todo.createdBy.toString()!==req.user._id.toString()){
            throw new ApiError(400,"You are not authorized to update this SubTodo")
        }
       if(title){
        subtodo = await SubTodo.findByIdAndUpdate(subtodoid, {
            $set: { title }
        }, { new: true })
    }
       if(content){
        subtodo = await SubTodo.findByIdAndUpdate(subtodoid, {
            $set: { content }
        }, { new: true })
    }
       if(content && title){
        subtodo = await SubTodo.findByIdAndUpdate(subtodoid, {
            $set: { content ,title}
        }, { new: true })
    }
        res.status(201).json(new ApiResponse(201, "Todo updated successfully", subtodo))
    } catch (error) {
        throw new ApiError(500, "Something went wrong while updating", error)

    }
}
const deleteSubTodo = async (req, res) => {
    try {
        const { subtodoid } = req.params
        const { todoid } = req.params

        console.log("todoid",todoid)
        console.log("subtodoid",subtodoid)
        let subtodo = await SubTodo.findById(subtodoid)
        if (!subtodo) {
            throw new ApiError(400, "SubTodo not found")
        }
        //checking user is owner of this todo or not
        const todo = await Todo.findById(todoid)
        if(!todo){
            throw new ApiError(400,"Todo not found")
        }   
        if(todo.createdBy.toString()!==req.user._id.toString()){
            throw new ApiError(400,"You are not authorized to delete this Subtodo")
        }
        if(todo.subTodos.indexOf(subtodoid)===-1){
            throw new ApiError(400,"Subtodo not found in this todo")
        }
        await subtodo.remove()
        await Todo.findByIdAndUpdate(todoid, {
            $pull: { subTodos: subtodoid }
        })
        res.status(200).json(new ApiResponse(200, "Todo deleted successfully"))
    } catch (error) {
        throw new ApiError(500, "Something went wrong while deleting", error)

    }
}

export {
    createSubTodo,
    updateSubTodo,
    deleteSubTodo
}