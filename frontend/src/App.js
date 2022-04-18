import React from 'react'

import { Routes, Route } from 'react-router-dom'

// Components
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import MyProfile from './components/MyProfile'
import Showcase from './components/Showcase'

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/myprofile" element={<MyProfile />} />
      <Route path="/showcase" element={<Showcase />} />
      <Route path="*" element={<Home />} />
    </Routes>
  </>

)

export default App
