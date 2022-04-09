import React from 'react'

import { Routes, Route } from 'react-router-dom'

// Components
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Home />} />
    </Routes>
  </>

)

export default App
