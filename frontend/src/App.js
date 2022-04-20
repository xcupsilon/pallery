import React from 'react'

import { Routes, Route } from 'react-router-dom'

// Toaster component for app
import { Toaster } from 'react-hot-toast'

// Components
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import MyProfile from './components/MyProfile'
import Profile from './components/Profile'
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
      <Route path="/profile/:username" element={<Profile />} />
    </Routes>
    <Toaster
      containerStyle={{
        top: 20,
        left: 20,
        bottom: 20,
        right: 20,
      }}
      toastOptions={{
        className: '',
        style: {
          padding: '20px',
          'font-size': '16px',
          'padding-left': '30px',
          'font-family': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        },
      }}
    />
  </>
)

export default App
