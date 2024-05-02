import {app} from './app.js'
import { connectDB } from './src/db/mongodb.js'
import dotenv from 'dotenv'

dotenv.config({
    path:'.env',
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT_NO,()=>{
        console.log(`Server is running on http://localhost:${process.env.PORT_NO}`);
    })
})
