import mongoose from 'mongoose'

const subTodoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        default:false,
    },
    completeBefore:{
        type:Date,
    }
},{timestamps:true})

export const SubTodo = mongoose.model("SubTodo",subTodoSchema)