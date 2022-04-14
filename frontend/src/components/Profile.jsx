import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Pfp from './Pfp'

const Profile = ({ user }) => {
  const [pfp, setPfp] = useState('')
  const [about, setAbout] = useState('')
  const [collection, setCollection] = useState([])

  return (
    <>
      <Link to='/'>
        <div className="mt-10 ml-14 text-5xl font-mono">
         &lt;
        </div>
      </Link>

      <div className="flex justify-center mt-32">
        <Pfp />
      </div>
    </>
  )
}

export default Profile
