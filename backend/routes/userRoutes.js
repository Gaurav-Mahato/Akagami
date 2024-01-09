const express = require('express')
const {registerUser, loginUser, updateProfile, findUser} = require('../controllers/userController.js') 
const {protect} = require('../middleware/authMiddleware.js')


const router = express.Router()

router.route("/login").post(loginUser)
router.route("/register").post(registerUser)
router.route("/profile")
    .put(protect,updateProfile)
    .post(protect,findUser)

module.exports = router
