const express = require('express')
const router = express.Router()
const upload = require('../multer-config')

const usercontrollers = require('../controllers/user-controllers')

router.get('/', usercontrollers.getUsers)
router.post('/signup', upload.single('image'), usercontrollers.signup)
router.post('/login',usercontrollers.login)

module.exports = router