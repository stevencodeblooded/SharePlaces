const User = require('../models/users')
const bcrypt = require('bcrypt') 

//GET USERS-----------------modal.find()-----------------------
const getUsers = async (req, res, send) => {

    let users;

    try {
        users = await User.find({}, '-password') //dont return the passwords
    } catch (error) {
        return res.status(500).json({ message: 'Fetching users failed, Please try again' })    
    }

    res.status(200).json({ users: users.map(u => u.toObject({ getters: true })) })
}


//SIGNUP---------------------modal.save()-----------------------
const signup = async (req, res, next) => {
    const { name, email, password } = req.body
    const image = req.file.filename

    let existingUser;

    try {
        existingUser = await User.findOne({email: email})
    } catch (error) {
        return res.status(500).json({message: 'Signup failed! Please Try again later'})
    }

    if (existingUser) {
        return res.status(422).json({message: 'User already exists, please login'})
    }

    let hashedPassword
    try {
        hashedPassword = await bcrypt.hash(password, 12)
    } catch (error) {
        return res.status(500).json({message: 'Could not create user, please try again'})
    }

    const createdUser = new User({
        name,
        email,
        password: hashedPassword,
        image,
        places: []
    })
    
    try {
        await createdUser.save()
    } catch (error) {
        return res.status(500).json({message: 'Signup failed! Please Try again later(Save)'})
    }
    
    res.status(201).json({user: createdUser.toObject({ getters: true}), message: 'Signup was successful, now Login'})
}


//LOGIN---------------------modal.find()-------------------------------
const login = async (req, res, next) => {
    const { email, password } = req.body

    let existingUser 

    try {
        existingUser = await User.findOne({ email: email })
    } catch (error) {
        return res.status(500).json({message: 'Login failed, Email cannot be found!'})
    }

    if (!existingUser) {
        return res.status(401).json({ message: 'invalid credentials, could not log in' })
    }

    let isValidPassword = false
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password)
    } catch (error) {
        return res.status(500).json({ message: 'Could not log you in , Please check your credentials and try again' })
    }
    
    if (!isValidPassword) {
        return res.status(500).json({ message: 'Invalid Credentials, Could not log you in. Please Try Again' })
    }

    res.status(200).json({message: 'Logged In Successfully!', user: existingUser.toObject({ getters: true })})
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login