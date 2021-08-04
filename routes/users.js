const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const { addUser, getUser } = require('../controllers/users')

router.post('/', addUser)
router.get('/me', auth, getUser)


module.exports = router