import React from 'react'

import phd from '../imgs/phd.jpg'
import yuta from '../imgs/yuta.jpg'

import { Link } from 'react-router-dom'

const Pfp = () => (
  <Link to="/profile">
    <div className="bg-grey-200">
      <img src={yuta} alt="" className="w-24 h-24 ml-3 rounded-full shadow-md hover:shadow-xl" />
    </div>
  </Link>
)

export default Pfp