import React from 'react'

import phd from '../imgs/phd.jpg'
import yuta from '../imgs/yuta.jpg'

import { Link } from 'react-router-dom'

const Pfp = ({ loggedIn }) => {
  const Img = () => {
    if (loggedIn) {
      return <img src={yuta} alt="" className="w-24 h-24 rounded-full hover:shadow-md" />
    } else {
      return <img src={phd} alt="" className="w-24 h-24 rounded-full hover:shadow-md" />
    }
  }

  return (
    <Link to="/profile">
      <div className="bg-grey-200">
        <Img />
      </div>
    </Link>
  )
}

export default Pfp