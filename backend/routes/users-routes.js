const express = require('express')
const router = express.Router()

const usercontrollers = require('../controllers/user-controllers')

// RETRIEVE USERS
router.get('/', usercontrollers.getUsers)

//SIGNUP
router.post('/signup', usercontrollers.signup)

//LOGIN
router.post('/login',usercontrollers.login)

module.exports = router