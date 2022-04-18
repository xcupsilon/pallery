import React from 'react'

import { Link } from 'react-router-dom'

const WelcomeBlock = ({ loggedIn }) => {
  if (!loggedIn) {
    return (
      <div className="container bg-100% bg-login_banner bg-center rounded-tr-2xl rounded-br-3xl shadow-lg hover:shadow-banner w-3/4 h-48 mt-12">
        <Link to="/login">
          <button type="button" className="appearance-none m-5 mt-7 px-10 py-10 text-6xl font-mono text-white">
            <h1 className="drop-shadow-light-glow hover:drop-shadow-glow">
              Please Login!
            </h1>
          </button>
        </Link>
      </div>
    )
  }
  return (
    <div className="container overflow-auto bg-100% bg-gallery_banner bg-center rounded-tr-2xl rounded-br-3xl shadow-lg hover:shadow-banner w-3/4 h-48 mt-12">
      <div className="m-5 mt-7 px-10 py-10 text-6xl font-mono text-white text-left">
        <h1 className="drop-shadow-light-glow hover:drop-shadow-glow">
          Your Pallery!
        </h1>
      </div>
    </div>
  )
}

export default WelcomeBlock
