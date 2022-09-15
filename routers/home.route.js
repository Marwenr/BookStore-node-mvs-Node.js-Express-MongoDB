const route = require('express').Router()
const homeController = require('../controllers/home')

route.get('/', homeController.getHomePage)


module.exports = route