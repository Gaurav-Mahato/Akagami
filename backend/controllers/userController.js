const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/User.js')

const registerUser = asyncHandler(async(req,res) => {
    const {name,email,password,contact} = req.body
    const userExists = await User.findOne({email})
    const salt = await bcrypt.genSalt(10)
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        name, 
        email,
        contact,
        password: await bcrypt.hash(password,salt)
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            contact: user.contact,
            email: user.email,
            password: user.password
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

const loginUser = async(req,res) => {
    const {name,email,phone,password} = req.body
    const userObject = {
        name,
        email, // email: email
        phone,
        password
    }
}

module.exports = {
    registerUser,
    loginUser
}