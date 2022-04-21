import React from 'react'

import { useNavigate } from 'react-router-dom'

const Showcase = ({ username, about, pfp }) => {
  const navigate = useNavigate()

  const redirect = () => {
    navigate(`/profile/${username}`)
  }

  return (
    <button onClick={e => redirect()} type="button" className="text-left p-5 pb-0 shadow-lg rounded-2xl border-2 border-solid border-gray-200">
      <div>
        <img src={pfp} alt="" className="object-cover inline w-20 h-20 rounded-full hover:shadow-md" />
        <h3 className="inline relative bottom-4 ml-5 font-semibold underline font-mono text-[1.35rem]">
          {username}
        </h3>
        <div className="pl-20 ml-5 relative bottom-7 font-mono text-lg text-gray-800">
          {about}
        </div>
      </div>
    </button>
  )
}

export default Showcase
