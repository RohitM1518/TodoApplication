import React from 'react'
import { AddTodoOrSubTodo } from '../components'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Link to={`/addtodo`}>
        <AddTodoOrSubTodo />
        </Link>
    </div>
  )
}

export default Home