const express = require('express')
const {registerUser, loginUser, updateProfile} = require('../controllers/userController.js') 
const {protect} = require('../middleware/authMiddleware.js')


const router = express.Router()

router.route("/login").post(loginUser)
router.route("/register").post(registerUser)
router.route("/profile").put(protect,updateProfile)

module.exports = router
