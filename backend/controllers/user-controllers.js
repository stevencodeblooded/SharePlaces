const User = require('../models/users')

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

    const createdUser = new User({
        name,
        email,
        password,
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

    if (!existingUser || existingUser.password !== password) {
        return res.status(401).json({ message: 'invalid credentials, could not log in' })
    }
    
    res.status(200).json({message: 'Logged In Successfully!', user: existingUser.toObject({ getters: true })})
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login