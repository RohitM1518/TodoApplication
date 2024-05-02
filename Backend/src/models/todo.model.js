import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    subTodos:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"SubTodo"
        }
    ],
    color:{
        type:String,
        default:"#000000"
    }
},{timestamps:true})

export const Todo = mongoose.model("Todo",todoSchema)