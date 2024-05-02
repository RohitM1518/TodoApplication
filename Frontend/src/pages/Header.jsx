import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice'

const Header = () => {
    const isLogin = useSelector(state => state.status)
    const dispatch = useDispatch()
    const navigate =useNavigate()
    console.log("User ", isLogin)
    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:3000/user/logout')
            dispatch(logout())
            navigate('/')

        } catch (error) {

        }
    }
    return (
        <div className=' bg-white flex justify-center items-center p-4'>
            <ul className=' flex gap-32 '>
                <Link to={`/`}>
                    <li>Home</li>
                </Link>
                {!isLogin && <Link to={`/login`}>
                    <li>Login</li>
                </Link>}
                {isLogin && <button onClick={logoutHandler} className=' text-white bg-slate-600 p-1 rounded-md'>
                    Logout
                </button>}
            </ul>
        </div>
    )
}

export default Header