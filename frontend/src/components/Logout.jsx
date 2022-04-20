import React from 'react'
import axios from 'axios'

import toast from 'react-hot-toast'

const successToast = () => toast.success(`Good Bye ;-;`, { icon: '🥲', duration: 4000 })
const throwLogout = error => toast.error(`${error.response.data}`, { icon: '💀' })

const Logout = ({ setLoggedIn }) => {
  const logout = async () => {
    await axios.post('/account/logout')
      .then(() => {
        successToast()
        setLoggedIn(false)
      })
      .catch(error => {
        throwLogout(error)
      })
  }

  return (
    <div className="mt-3 text-2xl font-mono text-dark_matcha">
      {/* <span className="font-semibold">
        Hi&nbsp;
      </span>
      <span className="font-semibold">
        {user}
        !&nbsp;
      </span> */}
      <button onClick={e => logout()} type="submit" className="inline" aria-label="Logout">
        &gt; Logout
      </button>
    </div>
  )
}

export default Logout
