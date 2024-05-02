import moongose from 'moongose'

const subTodoSchema = new moongose.Schema({
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
    completedBefore:{
        type:Date,
    }
},{timestamps:true})

export const SubTodo = moongose.model("SubTodo",subTodoSchema)