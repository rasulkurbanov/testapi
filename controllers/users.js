const { User } = require('../model/users')
const { validationResult } = require('express-validator')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const addUser = async (req, res) => {
  try {
    //Error validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send(`${errors['errors'][0].value} is already registered or ${errors['errors'][0].msg}`)
    }

    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).send('User has already registered.')
    }

    user = new User(_.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()

    const signedToken = jwt.sign({ id: user._id, email: user.email }, 'axaxathisisprivatekey')
    res.header('x-auth', signedToken).status(200).send(_.pick(user, ['name', 'email']))
  }
  catch (err) {
    console.log(err)
    return res.status(400).send(err.message)
  }
}

//api/users/:id
const getUser = async (req, res) => {
  try {
    let user = await User.findById({ _id: req.user.id }).select("-password")

    if (!user) {
      return res.status(400).send('Something went wrong')
    }

    return res.status(200).send(user)
  }
  catch (err) {
    console.log(err)
    return res.status(400).send(err.message)
  }
}



module.exports = { addUser, getUser }