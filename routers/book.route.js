const route = require('express').Router()
const bookController = require('../controllers/book')
const guardAuth = require('./guardAuth')
const multer  = require('multer')

route.get('/allbooks', guardAuth.isAuth, bookController.getAllBooksController)
route.get('/allbooks/:id', guardAuth.isAuth, bookController.getBookByIdController)

route.get('/addBook', guardAuth.isAuth, bookController.getAddBookController)

route.post('/addbook', multer({
  storage : multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/bookImg')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
}).single('image'), bookController.postAddBookController)

route.get('/mybooks', guardAuth.isAuth, bookController.getMyBooksController)
route.get('/mybooks/update/:id', guardAuth.isAuth, bookController.getUpdatePageController)
route.post('/mybooks/update', multer({
  storage : multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/bookImg')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
}).single('image'), guardAuth.isAuth, bookController.postUpdatePageController)

route.get('/mybooks/delete/:id', guardAuth.isAuth, bookController.deleteBookController)

module.exports = route