import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

// components
import Pfp from './Pfp'
import Logout from './Logout'
import Showcase from './Showcase'

const Home = () => {
  const [users, setUsers] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState('')

  const WelcomeBlock = () => {
    if (!loggedIn) {
      return (
        <div className="container bg-100% bg-login_banner bg-center rounded-tr-2xl rounded-br-3xl shadow-lg hover:shadow-banner w-3/4 h-48 mt-12">
          <Link to="/login">
            <button type="button" className="appearance-none m-5 mt-7 px-10 py-10 text-6xl font-mono text-white">
              <h1 className="drop-shadow-light-glow hover:drop-shadow-glow">
                Please Login!
              </h1>
            </button>
          </Link>
        </div>
      )
    }
    return (
      <div className="container overflow-auto bg-100% bg-gallery_banner bg-center rounded-tr-2xl rounded-br-3xl shadow-lg hover:shadow-banner w-3/4 h-48 mt-12">
        <div className="m-5 mt-7 px-10 py-10 text-6xl font-mono text-white text-left">
          <h1 className="drop-shadow-light-glow hover:drop-shadow-glow">
            Your Pallery!
          </h1>
        </div>
      </div>
    )
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data } = (await axios.get('/account/status'))
      const { username, status } = data
      setLoggedIn(status)
      if (status) {
        setLoggedInUser(username)
      }
    }

    checkLoginStatus()
    const intervalID = setInterval(() => {
      checkLoginStatus()
    }, 2000)

    return () => clearInterval(intervalID)
  }, [])

  return (
    <>
      <WelcomeBlock />
      <div className="absolute border-t-2 w-64 border-solid border-black top-12 right-0 flex flex-col items-center">
        <span className="w-48 py-5 relative left-20 border-b-2 border-black">
          <Pfp loggedIn={loggedIn} />
        </span>
        <span className="relative left-8">
          {loggedIn && 
            <Logout user={loggedInUser} />
          }
        </span>
      </div>
      <div className="grid grid-cols-3 gap-10 m-10">
        <Showcase />
        <Showcase />
        <Showcase />
        <Showcase />
        <Showcase />
        <Showcase />
        <Showcase />
        <Showcase />
        <Showcase />
      </div>
    </>
  )
}

export default Home
