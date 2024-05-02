import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { store } from './redux/store.js'
import {Home, AddTodo,Login} from '../src/pages/index.js'
import axios from 'axios'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './redux/store.js'

axios.defaults.withCredentials = true;

const router=createBrowserRouter([{
  path:'/',
  element:<App />,
  children:[
    {
      path:'/',
      element:<Home />
    },
    {
      path:'/addtodo',
      element:<AddTodo />
    },
    {
      path:'/login',
      element:<Login />
    },
  ]
}])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
