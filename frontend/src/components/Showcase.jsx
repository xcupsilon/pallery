import React from 'react'

import { Link } from 'react-router-dom'

const Showcase = () => (
  <div className='p-5 shadow-lg rounded-2xl border-2 border-solid border-gray-200'>
    <div>
      <img src={'https://i.pinimg.com/originals/96/9a/f0/969af09e0fc0dfc2b3f847cad812b6be.jpg'} alt="" className="inline w-16 h-16 rounded-full shadow-md hover:shadow-xl" />
      <h3 className="inline relative bottom-4 ml-5 underline font-mono text-xl">
        Megumi
      </h3>
      <div className='mt-3 font-mono'>
        I like art I like art I like art I like art I like art I like art I like art I like art I like art I like art I like art
      </div>
    </div>
  </div>
)

export default Showcase