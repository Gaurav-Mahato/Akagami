const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/User.js')
const generateToken = require('../utils/generateToken.js')

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
    const {email,password} = req.body 
    const user = await User.findOne({email})
    if(user && await bcrypt.compare(password,user.password)){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
}

const updateProfile = asyncHandler(async(req,res) => {
    const {name,email,password,contact} = req.body
    const user = await User.findById(req.user._id)
    const salt = await bcrypt.genSalt(10)
    if(user){
        user.name = name || user.name
        user.email = email || user.email
        user.contact = contact || user.contact
        if(password){
            user.password = await bcrypt.hash(password,salt)
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            contact: updatedUser.contact,
            token: generateToken(updatedUser._id)
        })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
})

const findUser = asyncHandler(async(req,res) => {

    // Classify query generating user && query 
    const user = await User.findById(req.user._id)
    const {email} = req.body

    // Check on query
    const query_user = await User.findOne({email})

    // User found
    if(query_user){
        // Perform operation
            
            // Add him in user's contact list
            const response = [query_user]
            res.status(200).send(response)
    }

    // User not found
    else{
        res.status(404).send({
            message: "User not found"
        })
    }

})

module.exports = {
    registerUser,
    loginUser,
    updateProfile,
    findUser
}