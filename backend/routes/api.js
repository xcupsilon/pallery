const express = require('express')

const router = express.Router()
const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/profile/get_data', isAuthenticated, async (req, res) => {
  try {
    const { session } = req
    const { username } = session
    const data = await User.findOne({ username })
    res.json(data) // Send back the user data
  } catch (error) {
    res.status(400).send('Error occurred when fetching user profile data')
  }
})

router.post('/profile/add_picture', isAuthenticated, async (req, res) => {
  try {
    const { body, session } = req
    const { username } = session
    const { pfp } = body
    await User.updateOne({ username },
      {
        $set:
        {
          pfp,
        },
      })
    res.send(`Profile picture updated for ${username}`)
  } catch (error) {
    res.status(400).send('Error occurred when updating profile picture')
  }
})

router.post('/profile/change_about', isAuthenticated, async (req, res) => {
  try {
    const { body, session } = req
    const { username } = session
    const { about } = body
    await User.updateOne({ username },
      {
        $set:
        {
          about,
        },
      })
    res.send(`Profile about me for ${username}`)
  } catch (error) {
    res.status(400).send('Error occurred when updating about me')
  }
})

router.post('/questions/add', isAuthenticated, async (req, res) => {
  try {
    const { body, session } = req
    const { username } = session // Getting the author from the cookie :)
    const { questionText } = body
    await Question.create({ questionText, author: username })
    res.send(`Question created for "${questionText}" by ${username}`)
  } catch (error) {
    res.status(400).send('Error occured when adding question!')
  }
})

module.exports = router
