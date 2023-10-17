const express = require('express')
const router = express.Router()
const uuid = require('uuid')

const User = require('../models/users')

const DUMMY_USERS = [{
    id: 'ul',
    name: 'Steven OChieng',
    email: 'text@test.com',
    password: 'password'
}]

// RETRIEVE USERS
router.get('/', (req, res, send) => {
    res.status(200).json({users: DUMMY_USERS})
})

//SIGNUP
router.post('/signup', (req, res, next) => {
    const { name, email, password } = req.body

    const isExistingEmail = DUMMY_USERS.find(user => user.email === email)
    if (isExistingEmail) {
        return res.status(422).json({message: 'Email already exists'})
    }
    
    const createdUser =  {
        id: uuid.v4(),
        name,
        email,
        password
    }
    
    DUMMY_USERS.push(createdUser)
    res.status(201).json({user: createdUser})
})


//LOGIN
router.post('/login', (req, res, next) => {
    const { email, password } = req.body

    const identifiedUser = DUMMY_USERS.find(user => user.email === email)
    if (!identifiedUser || identifiedUser.password  !== password) {
        return res.status(401).json({message: 'No User Found, confirm Credentials!'})
    }

    res.status(200).json({message: 'Logged In Successfully!'})
})


module.exports = router