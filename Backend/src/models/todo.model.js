import moongose from 'moongose'

const todoSchema = new moongose.Schema({
    title:{
        type:String,
        required:true,
    },
    createdBy:{
        type: moongose.Schema.Types.ObjectId,
        ref:"User"
    },
    subTodos:[
        {
            type: moongose.Schema.Types.ObjectId,
            ref:"SubTodo"
        }
    ]
},{timestamps:true})

export const Todo = moongose.model("Todo",todoSchema)