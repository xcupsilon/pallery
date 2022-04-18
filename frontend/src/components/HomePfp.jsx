import React from 'react'
import { Link } from 'react-router-dom'

import phd from '../imgs/phd.jpg'

const HomePfp = ({ loggedIn, pfp }) => {
  if (loggedIn) {
    return (
      <Link to="/myprofile">
        <div className="bg-grey-200">
          <img src={pfp} alt="" className="w-24 h-24 rounded-full hover:shadow-md" />
        </div>
      </Link>
    )
  }
  return (
    <div className="bg-grey-200">
      <img src={phd} alt="" className="w-24 h-24 rounded-full hover:shadow-md" />
    </div>
  )
}

export default HomePfp
