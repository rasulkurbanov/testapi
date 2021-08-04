const bcrypt = require('bcrypt')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const { User } = require('../model/users')
const { validationResult } = require('express-validator')

const auth = async (req, res) => {
  try {
    //Error validation
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).send(`${errors['errors'][0].value} is already registered or ${errors['errors'][0].msg}`)
    }

    let user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(400).send('email or password is incorrect')
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) {
      return res.status(401).send('You are not authorized')
    }

    const signedToken = jwt.sign({ id: user._id, email: user.email }, 'axaxathisisprivatekey')

    res.header('x-auth', signedToken).status(200).send('user is verified')
  }
  catch (err) {
    console.log(err)
    return res.status(400).send(err.message)
  }
}

module.exports = auth