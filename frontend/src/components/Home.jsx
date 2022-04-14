import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

// components
import Pfp from './Pfp'
import Logout from './Logout'

// pictures
import phd from '../imgs/phd.jpg'
import gallery_banner from '../imgs/gallery_banner.jpg'
import login_banner from '../imgs/login_banner.jpg'

const Home = () => {
  const [users, setUsers] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState('')

  const WelcomeBlock = () => {
    if (!loggedIn) {
      return (
        <div className="container bg-login_banner bg-center rounded-tr-2xl rounded-br-3xl shadow-lg hover:shadow-banner w-3/4 h-48 mt-12">
          <Link to="/login">
            <button type="button" className="appearance-none m-5 mt-7 px-10 py-10 text-6xl hover:drop-shadow-glow font-mono text-white">
              Please Login!
            </button>
          </Link>
        </div>
      )
    }
    return (
      <div className="container bg-gallery_banner bg-center rounded-tr-2xl rounded-br-3xl shadow-lg hover:shadow-banner w-3/4 h-48 mt-12">
        <div className="px-10 py-10 m-5 mt-7 text-6xl font-mono hover:drop-shadow-glow text-white text-left">
          Your Pallery!
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
      <div className="absolute top-12 right-12 flex flex-col justify-items-end">
        <Pfp loggedIn={loggedIn} />
        {loggedIn && 
          <Logout user={loggedInUser} />
        }
      </div>
    </>
  )
}

export default Home
