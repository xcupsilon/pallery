import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

// image
import phd from '../imgs/phd.jpg'

// components
import Pfp from './Pfp'

const Profile = () => {
  // navigator used for redirecting to different routes
  const navigate = useNavigate()

  // get the route params
  const { username } = useParams()

  const [pageUser, setPageUser] = useState('')
  const [myPfp, setMyPfp] = useState(phd)
  const [myAbout, setMyAbout] = useState('')
  const [myCollection, setMyCollection] = useState([])

  const [scrollWidth, setScrollWidth] = useState(0)
  const carousel = useRef()

  useEffect(() => {
    const getProfileInfo = async () => {
      const { data } = (await axios.post('/api/profile/get_user_data', { username }))
      const { data: myData } = (await axios.get('/api/profile/get_data'))
      // get the currently loggedinuser
      const { username: loggedInUser } = myData
      const {
        username: currentUser, pfp, about, collections,
      } = data
      // if the user of the profile is the current loggedin user, go to my profile page
      if (loggedInUser === currentUser) {
        navigate('/myprofile')
      }
      if (!pfp) {
        setMyPfp(phd)
      } else {
        setMyPfp(pfp)
      }
      setPageUser(currentUser)
      setMyAbout(about)
      if (collections) {
        setMyCollection(collections)
      }
    }

    getProfileInfo()
  }, [])

  useEffect(() => {
    setScrollWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
  }, [myCollection])

  return (
    <>
      <Link to="/">
        <div className="mt-10 ml-14 text-5xl font-mono">
          &lt;
        </div>
      </Link>

      <div className="mx-10 flex flex-col justify-center items-center mt-10">
        <Pfp loggedIn pfp={myPfp} isUser={false} />
        <div className="p-5 w-1/3 text-center border-b-2 border-black font-mono text-2xl">
          {pageUser}
        </div>
        <div className="p-5 pb-12 w-full text-center border-b-2 border-black sfont-bold font-mono text-2xl">
          {myAbout}
        </div>
      </div>

      <div className="m-10 mt-8 flex justify-center ">
        <motion.div ref={carousel} className="carousel cursor-grab overflow-hidden">
          <motion.div drag="x" dragConstraints={{ right: 0, left: -scrollWidth }} className="inner-carousel flex">
            {myCollection.map(img => (
              <motion.div className="item pr-16" key={uuidv4()}>
                <img src={img} alt="" className="drop-shadow shadow-md min-h-[26rem] h-[26rem] min-w-[36rem] w-[36rem] object-cover rounded-sm pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default Profile
