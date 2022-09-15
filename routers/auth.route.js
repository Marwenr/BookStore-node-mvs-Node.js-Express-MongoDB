const route = require('express').Router()
const authController = require('../controllers/auth')
const body = require('express').urlencoded({extended:true})
const guardAuth = require('./guardAuth')

route.get('/register', guardAuth.notAuth, authController.getRegisterPageController)
route.post('/register', body, authController.postRegisterData)

route.get('/login', guardAuth.notAuth, authController.getLoginPageController)
route.post('/login', body, authController.postLoginData)

route.post('/logout', authController.logOutFunctionController)

module.exports = route