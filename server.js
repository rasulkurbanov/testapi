const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const Movies = require('./model/movies')
const PORT = process.env.PORT || 5500
const { check, validationResult } = require('express-validator')
connectDB()
const userRoutes = require('./routes/users')
const auth = require('./routes/auth')


app.use(express.json())

// api/users  route
app.use('/api/users', [
  check('name', "name field must be at least 5 characters")
    .exists()
    .isLength({ min: 5 }),
  check('email', "Email is not valid")
    .isEmail()
    .normalizeEmail()
], userRoutes)

app.use('/api/auth', [

  check('email', "Email is not valid")
    .isEmail()
    .normalizeEmail(),
  check('password', "password field must be filled")
    .exists()
    .isLength({ min: 5 }),
], auth)


app.get('/', (_, res) => {
  res.status(200).json({ data: "Index page" })
})



app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))