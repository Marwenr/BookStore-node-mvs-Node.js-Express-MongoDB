const bookModel = require('../models/book')


exports.getAllBooksController = (req,res) => {
  bookModel.getAllBooks().then((books) => {
    res.render('pages/allBooks',{books:books, verifUser:req.session.userId})
  })
}

exports.getBookByIdController = (req,res) => {
  let id = req.params.id
  bookModel.getBookIdFunction(id).then((book) => {
    res.render('pages/details', {book:book, verifUser:req.session.userId})
  })
}

exports.getAddBookController = (req,res) => {
  res.render('pages/addBook', {verifUser:req.session.userId})
}


exports.postAddBookController = (req,res) => {
  bookModel.postAddBookFunction(req.body.title,req.body.description,req.body.price,req.body.author,req.file.filename,req.session.userId).then(() => {
    res.redirect('/')
  }).catch((err) => {
    console.log(err)
  })
}

exports.getMyBooksController = (req,res) => {
  bookModel.getMyBooksFunction(req.session.userId).then((books) => {
    res.render('pages/mybooks', {verifUser:req.session.userId, myBooks:books})
  })
}

exports.getUpdatePageController = (req,res) => {
  let id = req.params.id
  bookModel.getBookIdFunction(id).then((book) => {
    res.render('pages/updateBook', {book:book, verifUser:req.session.userId})
  })
}

exports.postUpdatePageController = (req,res) => {
  if(req.file) {
    bookModel.postUpdatePageFunction(req.body.bookId,req.body.title,req.body.description,req.body.price,req.body.author,req.file.filename).then((msg) => {
      res.redirect('/mybooks')
    }).catch((err) => {
      res.redirect('/mybooks')
      console.log(err)
    })
  } else {
    bookModel.postUpdatePageFunction(req.body.bookId,req.body.title,req.body.description,req.body.price,req.body.author,req.body.oldImage).then((msg) => {
      res.redirect('/mybooks')
    }).catch((err) => {
      res.redirect('/mybooks')
      console.log(err)
    })
  }
}

exports.deleteBookController = (req,res) => {
  let id = req.params.id
  bookModel.deleteBookFunction(id).then(() => {
    res.redirect('/mybooks')
  }).catch(() => {
    res.redirect('/mybooks')
  })
}