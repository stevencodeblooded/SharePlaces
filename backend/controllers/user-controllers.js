const User = require('../models/users')

const DUMMY_USERS = [{
    id: 'ul',
    name: 'Steven OChieng',
    email: 'text@test.com',
    password: 'password'
}]


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
    const { name, email, password, places } = req.body

    let existingUser;

    try {
        existingUser = await User.findOne({email: email})
    } catch (error) {
        return res.status(500).json({message: 'Signup failed! Please Try again later'})
    }

    if (existingUser) {
        return res.json({message: 'User already exists, please login'}).status(422)
    }

    const createdUser = new User({
        name,
        email,
        password,
        image: "data:image/jpeg;base64,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",
        places
    })
    
    try {
        await createdUser.save()
    } catch (error) {
        return res.status(500).json({message: 'Signup failed! Please Try again later(Save)'})
    }
    
    res.status(201).json({user: createdUser.toObject({ getters: true})})
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
    
    res.status(200).json({message: 'Logged In Successfully!'})
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login