import React from 'react'
import { Link } from 'react-router-dom'

import phd from '../imgs/phd.jpg'

const HomePfp = ({ loggedIn, pfp }) => {
  if (loggedIn) {
    return (
      <Link to="/myprofile">
        <div className="bg-grey-200">
          <img src={pfp} alt="" className="object-cover w-28 h-28 rounded-full hover:shadow-md" />
        </div>
      </Link>
    )
  }
  return (
    <Link to="/login">
      <div className="bg-grey-200">
        <img src={phd} alt="" className="object-cover w-28 h-28 rounded-full hover:shadow-md" />
      </div>
    </Link>
  )
}

export default HomePfp
