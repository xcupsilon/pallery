import React from 'react'

import { useNavigate } from 'react-router-dom'

const Showcase = ({ username, about, pfp }) => {
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
