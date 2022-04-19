import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

// image
import phd from '../imgs/phd.jpg'

// components
import Pfp from './Pfp'

const Profile = () => {
  // get the route params
  const { username } = useParams()

  const [user, setUser] = useState('')
  const [myPfp, setMyPfp] = useState(phd)
  const [myAbout, setMyAbout] = useState('')
  const [myCollection, setMyCollection] = useState([])

  const [scrollWidth, setScrollWidth] = useState(0)
  const carousel = useRef()

  useEffect(() => {
    const getProfileInfo = async () => {
      const { data } = (await axios.post('/api/profile/get_user_data', { username }))
      const {
        serverUser, pfp, about, collections,
      } = data
      if (!pfp) {
        setMyPfp(phd)
      } else {
        setMyPfp(pfp)
      }
      setUser(serverUser)
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
          {user}
        </div>
        <div className="p-5 pb-12 w-full text-center border-b-2 border-black sfont-bold font-mono text-2xl">
          {myAbout}
        </div>
      </div>

      <div className="m-10 mt-5 flex justify-center ">
        <motion.div ref={carousel} className="carousel cursor-grab overflow-hidden">
          <motion.div drag="x" dragConstraints={{ right: 0, left: -scrollWidth }} className="inner-carousel flex">
            {myCollection.map((img, index) => (
              <motion.div className="item p-5" key={uuidv4()}>
                <img src={img} alt="" className="drop-shadow shadow-md min-h-[25rem] h-[25rem] min-w-[35rem] w-[35rem] object-cover rounded-sm pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default Profile
