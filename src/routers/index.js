const router = require('express').Router()
const users = require('./UserRouter.js')

router.use('/users', users)

module.exports = router