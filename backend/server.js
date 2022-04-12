const express = require('express')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')
const path = require('path')

// Routers
const AccountRouter = require('./routes/account')
const ApiRouter = require('./routes/api')

// Start the app and get mongoDB url
const app = express()
const MONGO_URL = process.env.MONGODB_URL || 'mongodb+srv://xcyan:HONrD8ul6CpIxqci@main.ual8d.mongodb.net/pallery?retryWrites=true&w=majority'

app.use(express.json()) // Parse body using middleware
app.use(express.static('dist')) // points to static folder

// If connection fails, will show up here
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cookieSession({
  name: 'session',
  keys: ['mango!'],
  maxAge: 24 * 60 * 60 * 1000, // expiration time: 24 hours
}))

app.get('/', (req, res) => {
  res.send('hello from root')
})

app.use('/account', AccountRouter)
app.use('/api', ApiRouter)

// Erorr handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return
  }
  res.status(500)
  res.send(`An error has occured, reason: "${err.message}"`)
})

// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

// set the initial entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
