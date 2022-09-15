const bookModel = require('../models/book')

exports.getHomePage = (req,res) => {
  bookModel.getSixBooks().then((books) => {
    res.render('pages/home',{books:books, verifUser:req.session.userId})
  })
}