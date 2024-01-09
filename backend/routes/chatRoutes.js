const express = require('express')
const {accessChat, fetchChats} = require('../controllers/chatController.js')
const {protect} = require('../middleware/authMiddleware.js')

const router = express.Router()

router.route("/")
    .post(protect,accessChat)
    .get(protect,fetchChats)

module.exports = router