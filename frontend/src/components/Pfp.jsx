import React from 'react'
import { Link } from 'react-router-dom'

import phd from '../imgs/phd.jpg'

const Pfp = ({ loggedIn, pfp, isUser }) => {
  if (loggedIn) {
    if (isUser) {
      return (
        <Link to="/myprofile">
          <div className="bg-grey-200">
            <img src={pfp} alt="" className="object-cover w-40 h-40 rounded-full hover:shadow-md" />
          </div>
        </Link>
      )
    }
    return (
      <div className="bg-grey-200">
        <img src={pfp} alt="" className="object-cover w-40 h-40 rounded-full hover:shadow-md" />
      </div>
    )
  }
  return (
    <div className="bg-grey-200">
      <img src={phd} alt="" className="w-40 h-40 rounded-full hover:shadow-md" />
    </div>
  )
}

export default Pfp
