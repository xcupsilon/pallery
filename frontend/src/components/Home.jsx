import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

// components
import Pfp from './Pfp'

// pictures
import phd from '../imgs/phd.jpg'
import gallery_banner from '../imgs/gallery_banner.jpg'
import login_banner from '../imgs/login_banner.jpg'

const Home = () => {
  const [users, setUsers] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState('')

    const WelcomeMessage = () => {
      if (!loggedIn) {
        return (
          <Link to="/login">
            <button type="button" className="shadow appearance-none rounded-lg m-5 mb-5 px-10 py-10 text-4xl font-mono text-white text-left">
              Please Login!
            </button>
          </Link>
        )
      }
      return (
        <div className="px-10 py-10 text-4xl font-mono text-white text-left">
          Your Pallery!
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
      <div className="container bg-black rounded-lg shadow-xl w-3/4 h-48 mt-12">
        <WelcomeMessage />
      </div>
      <div className="absolute top-12 right-12">
        <Pfp />
      </div>
    </>

  )
}

export default Home
