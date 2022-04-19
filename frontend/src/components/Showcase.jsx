import React from 'react'

import { Link, useNavigate } from 'react-router-dom'

const Showcase = ({ username = 'Megumi', about = 'lol lol', pfp = 'https://i.pinimg.com/originals/96/9a/f0/969af09e0fc0dfc2b3f847cad812b6be.jpg' }) => {
  const navigate = useNavigate()

  const redirect = () => {
    navigate(`/profile/${username}`)
  }

  return (
    <button onClick={e => redirect()} type="button" className="text-left p-5 shadow-lg rounded-2xl border-2 border-solid border-gray-200">
      <div>
        <img src={pfp} alt="" className="inline w-16 h-16 rounded-full hover:shadow-md" />
        <h3 className="inline relative bottom-4 ml-5 underline font-mono text-xl">
          {username}
        </h3>
        <div className="mt-3 font-mono">
          {about}
        </div>
      </div>
    </button>
  )
}

export default Showcase
