import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                email,
                password,
            }
            console.log('hello')
            const res = await axios.post('http://localhost:3000/user/login', data)
            console.log("Response",res.data.data)
            dispatch(login(res.data.data))
            navigate('/')
        } catch (error) {
            console.log("Error ",error)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className=' flex flex-col justify-center items-center gap-7'>
                <div>
                    Email: <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} className=' text-black rounded-lg p-1' />
                </div>
                <div>
                    Password: <input type="text" required value={password} onChange={(e) => setPassword(e.target.value)} className=' text-black rounded-lg p-1' />
                </div>
                <div>
                    <button className=' bg-gray-800 rounded-lg p-1'>Create Todo</button>
                </div>
            </form>
        </div>
    )
}

export default Login