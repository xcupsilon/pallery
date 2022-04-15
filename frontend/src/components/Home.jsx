import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

// components
import WelcomeBlock from './WelcomeBlock'
import Pfp from './Pfp'
import Logout from './Logout'
import Showcase from './Showcase'

const Home = () => {
  const [users, setUsers] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState('')

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
      <WelcomeBlock loggedIn={loggedIn}/>
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
