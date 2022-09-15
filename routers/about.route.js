const route = require('express').Router()
const aboutController = require('../controllers/about')


route.get('/about',aboutController.getAboutPage)

module.exports = route