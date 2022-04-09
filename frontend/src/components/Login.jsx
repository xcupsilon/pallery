import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const login = async () => {
    await axios.post('/account/login', { username, password })
      .then(() => {
        navigate('/')
      })
      .catch(error => {
        alert(`${error.response.data}`)
      })
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="flex bg-light_matcha w-3/4 h-4/6 p-20 rounded-3xl shadow-lg">
        <div className="justify-start">
          <h1 className="text-dark_matcha font-semibold text-7xl font-mono">Login</h1>
          <div className="mb-4">
            <input onChange={e => setUsername(e.target.value)} value={username} className="w-80 shadow border rounded-lg py-2 px-3 mt-10 text-dark_matcha text-base leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="email" placeholder="Username" />
          </div>
          <div className="mb-4">
            <input onChange={e => setPassword(e.target.value)} type="password" value={password} className="w-80 shadow border rounded-lg py-2 px-3 text-dark_matcha text-base leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="password" placeholder="Password" />
          </div>
          <button type="submit" onClick={e => login()} className="w-20 shadow appearance-none border rounded-lg py-2 px-3 text-orange-700 bg-orange-200 text-base leading-tight">
            Log In
          </button>
          <Link to="/signup">
            <h2 className="text-greentea text-xl inline">&nbsp;&nbsp;Don&apos;t have an account?</h2>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
