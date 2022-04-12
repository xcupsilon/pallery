import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'
import banner from '../imgs/signup.jpg'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const createUser = async () => {
    await axios.post('/account/signup', { username, password })
      .then(() => {
        navigate('/')
      })
      .catch(error => {
        alert(`${error.response.data}`)
      })
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="grid grid-cols-5 bg-blue-100 w-3/4 h-4/6 p-20 rounded-3xl shadow-lg">
        <img src={banner} alt="" className="object-cover col-span-3 h-full w-5/6 rounded-2xl bg-white border-solid border-8 border-blue-200 shadow-lg hover:shadow-xl" />
        <div className="col-span-2 flex flex-col justify-center items-center">
          <h1 className="text-blue-300 font-semibold text-6xl font-mono mb-2 mt-8">Signup</h1>
          <h2 className="text-blue-200 text-2xl inline">
            already have an account?
            <Link to="/login" className="text-2xl text-black inline"> login</Link>
          </h2>
          <div className="mb-4">
            <input onChange={e => setUsername(e.target.value)} value={username} className="w-80 shadow border rounded-lg py-4 px-3 mt-16 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="username" type="text" placeholder="Username" />
          </div>
          <div className="mb-4">
            <input onChange={e => setPassword(e.target.value)} value={password} className="w-80 shadow border rounded-lg py-4 px-3 mt-2 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="password" type="password" placeholder="Password" />
          </div>
          <button onClick={e => createUser()} type="submit" className="w-60 shadow appearance-none border rounded-lg py-4 px-3 mt-2 text-blue-400 bg-blue-200 text-lg leading-tight">
            Signup
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signup
