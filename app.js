const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const errorHandler = require('./src/middlewares/errorHandler');
const routes = require('./src/routers/index.js')

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)
app.use(errorHandler)

module.exports = app