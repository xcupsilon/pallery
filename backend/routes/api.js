const express = require('express')

const router = express.Router()
const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.post('/users/get_data_all', isAuthenticated, async (req, res) => {
  try {
    const data = await User.find()
    // remove all the user password from data
    for (let i = 0; i < data.length; i++) {
      delete data[i]._doc.password
    }
    res.json(data) // Send back the user data
  } catch (error) {
    res.status(400).send('Error occurred when fetching user profile data')
  }
})

router.get('/profile/get_data', isAuthenticated, async (req, res) => {
  try {
    const { session } = req
    const { username } = session
    const data = await User.findOne({ username })
    delete data._doc.password // Delete user password property to send back
    res.json(data) // Send back the user data
  } catch (error) {
    res.status(400).send('Error occurred when fetching user profile data')
  }
})

router.post('/profile/get_user_data', isAuthenticated, async (req, res) => {
  try {
    const { body } = req
    const { username } = body
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

router.post('/profile/add_collection', isAuthenticated, async (req, res) => {
  try {
    const { body, session } = req
    const { username } = session
    const { newImg } = body
    const { collections } = await User.findOne({ username })

    if (!collections) {
      await User.updateOne({ username },
        {
          $set:
          {
            collections: [newImg],
          },
        })
    } else {
      await User.updateOne({ username },
        {
          $set:
          {
            collections: [...collections, newImg],
          },
        })
    }
    res.send(`New placeholder art added to collection`)
  } catch (error) {
    res.status(400).send('Error occurred when adding to collection')
  }
})

router.post('/profile/replace_collection', isAuthenticated, async (req, res) => {
  try {
    const { body, session } = req
    const { username } = session
    const { replaceIndex, newImg } = body
    const { collections } = await User.findOne({ username })

    if (!collections) {
      await User.updateOne({ username },
        {
          $set:
          {
            collections: [newImg],
          },
        })
    } else {
      collections[replaceIndex] = newImg
      await User.updateOne({ username },
        {
          $set:
          {
            collections,
          },
        })
    }
    res.send(`Old image replaced by new image in collection`)
  } catch (error) {
    res.status(400).send('Error occurred when replacing collection')
  }
})

module.exports = router
