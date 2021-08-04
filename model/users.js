const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: true,
    unique: true,
  }
})

const User = mongoose.model('User', userSchema)
exports.User = User