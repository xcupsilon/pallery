const express = require('express')

const router = express.Router()
const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/status', async (req, res) => {
  try {
    if (req.session.username || req.session.username === '') {
      res.json({ username: req.session.username, status: true })
    } else {
      res.json({ status: false })
    }
  } catch (error) {
    res.status(400).send(`Getting user login status failed: ${error.message}`)
  }
})

router.post('/signup', async (req, res) => {
  try {
    const { body } = req
    const { username, password } = body
    const result = await User.findOne({ username })
    // if user already exists, then let go registration
    if (result) {
      throw new Error(`user "${username}" already exists`)
    } else {
      await User.create({ username, password })
      res.send(`Signup for ${username} was succesful, hooray!!`)
    }
  } catch (error) {
    res.status(400).send(`Signup failed, reason: ${error.message}`)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { body } = req
    const { username, password } = body
    const result = await User.findOne({ username, password }) // get the user with matching username and password
    if (result) {
      req.session.username = username
      res.send(`User: ${username} succesfully logged in`)
    } else {
      throw new Error(`incorrect credentials`)
    }
  } catch (error) {
    res.status(400).send(`User login failed, reason: ${error.message}`)
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session = null // destroy the session
  res.send('User logged out')
})

module.exports = router
