import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

// components
import WelcomeBlock from './WelcomeBlock'
import Logout from './Logout'
import Showcase from './Showcase'

// img
import phd from '../imgs/phd.jpg'
import HomePfp from './HomePfp'

const Home = () => {
  const [users, setUsers] = useState('')
  const [myPfp, setMyPfp] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState('')

  useEffect(() => {
    const getProfileInfo = async () => {
      const { data } = (await axios.get('/api/profile/get_data'))
      const { pfp } = data
      if (!pfp) {
        setMyPfp(phd)
      } else {
        setMyPfp(pfp)
      }
    }

    const checkLoginStatus = async () => {
      const { data } = (await axios.get('/account/status'))
      const { username, status } = data
      setLoggedIn(status)
      if (status) {
        setLoggedInUser(username)
      }
    }

    getProfileInfo()
    checkLoginStatus()
    const intervalID = setInterval(() => {
      checkLoginStatus()
    }, 2000)

    return () => clearInterval(intervalID)
  }, [])

  return (
    <>
      <WelcomeBlock loggedIn={loggedIn} />
      <div className="absolute border-t-2 w-64 border-solid border-black top-12 right-0 flex flex-col items-center">
        <span className="w-48 py-5 relative left-20 border-b-2 border-black">
          <HomePfp loggedIn={loggedIn} pfp={myPfp} />
        </span>
        <span className="relative left-8">
          {loggedIn
            && <Logout user={loggedInUser} />}
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
