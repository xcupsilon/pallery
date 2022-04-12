const { Schema, model } = require('mongoose')

// Creating the user schema, defines what our database would look like
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  about: { type: String },
  pfp: { type: String},
  collections: { type: Array, 'default': [] },
})
// Defining a name for the schema
const User = model('User', userSchema)

module.exports = User