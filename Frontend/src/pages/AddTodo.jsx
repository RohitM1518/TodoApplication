import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const AddTodo = () => {
    const [title,setTitle]=useState('')
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:3000/todo/create',{title},{
                withCredentials:true,
            })
            console.log(res)
        } catch (error) {
            
        }
    }
  return (
    <div className=' text-white'>
        <form onSubmit={handleSubmit} className=' flex flex-col justify-center items-center gap-7'>
            <div>
                Title: <input type="text" required value={title} onChange={(e)=>setTitle(e.target.value)} className=' text-black rounded-lg p-1'/>
            </div>
            <div>
                <button className=' bg-gray-800 rounded-lg p-1'>Create Todo</button>
            </div>
        </form>
    </div>
  )
}

export default AddTodo