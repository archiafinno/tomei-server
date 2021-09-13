const router = require('express').Router()
const UserController = require('../controllers/UserController.js')
const { upload } = require("../middlewares/imgMulter")

router.post('/sign-up', upload, UserController.signUp)

module.exports = router