import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast'

import axios from 'axios'

import banner from '../imgs/login.jpg'

const successToast = () => toast.success(`Succesfully Logged In, Welcome :)`, { icon: '🥳', duration: 4000 })
const throwLoginError = error => toast.error(`${error.response.data}`, { icon: '💀' })

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const login = async () => {
    await axios.post('/account/login', { username, password })
      .then(() => {
        successToast()
        navigate('/')
      })
      .catch(error => {
        throwLoginError(error)
      })
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      login()
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="grid grid-cols-5 bg-white w-3/4 h-4/6 p-20 pl-10 rounded-3xl shadow-xl font-mono">
        <div className="col-span-2 flex flex-col justify-center items-center">
          <h1 className="text-red-300 font-semibold text-7xl font-mono mb-2 mt-8">Welcome!</h1>
          <h2 className="text-red-200 text-2xl">
            don&apos;t have an account?
            <Link to="/signup" className="text-2xl text-black inline"> sign up</Link>
          </h2>
          <div className="mb-4">
            <input onChange={e => setUsername(e.target.value)} value={username} onKeyDown={handleKeyDown} className="w-80 shadow border rounded-xl py-4 px-3 mt-16 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="email" type="text" placeholder="Username" />
          </div>
          <div className="mb-4">
            <input onChange={e => setPassword(e.target.value)} value={password} onKeyDown={handleKeyDown} className="w-80 shadow border rounded-xl py-4 px-3 mt-2 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="password" type="password" placeholder="Password" />
          </div>
          <button onClick={e => login()} type="submit" className="w-60 shadow appearance-none border rounded-xl py-4 px-3 mt-2 mb-8 text-red-500 bg-red-200 text-lg leading-tight">
            Login
          </button>
        </div>
        <img src={banner} alt="" className="object-cover col-span-3 h-full w-5/6 rounded-2xl ml-20 bg-white border-solid border-8 border-red-200 border-double shadow-lg hover:shadow-xl" />
      </div>
    </div>
  )
}

export default Login
