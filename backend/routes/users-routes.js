const express = require('express')
const router = express.Router()

const usercontrollers = require('../controllers/user-controllers')

router.get('/', usercontrollers.getUsers)
router.post('/signup', usercontrollers.signup)
router.post('/login',usercontrollers.login)

module.exports = router