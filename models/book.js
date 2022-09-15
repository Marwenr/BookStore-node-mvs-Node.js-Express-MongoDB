const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
  title:String,
  description:String,
  price:Number,
  author:String,
  image:String,
  userId:String
})

const Book = mongoose.model('book', bookSchema)
const url = 'mongodb+srv://marwen:marwen@cluster0.maa5ozc.mongodb.net/?retryWrites=true&w=majority'

exports.getSixBooks = () => {
  return new Promise((resolve,reject) => {
    mongoose.connect(url).then(() => {
      return Book.find({}).limit(6)
    }).then((books) => {
      mongoose.disconnect()
      resolve(books)
    }).catch((err) => {
      mongoose.disconnect()
      reject(err)
    })
  })
}

exports.getAllBooks = () => {
  return new Promise((resolve,reject) => {
    mongoose.connect(url).then(() => {
      return Book.find({})
    }).then((books) => {
      mongoose.disconnect()
      resolve(books)
    }).catch((err) => {
      mongoose.disconnect()
      reject(err)
    })
  })
}

exports.getBookIdFunction = (id) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url).then(() => {
      return Book.findById(id)
    }).then((book) => {
      mongoose.disconnect()
      resolve(book)
    }).catch((err) => {
      mongoose.disconnect()
      reject(err)
    })
  })
}

exports.postAddBookFunction = (title,description,price,author,image,userId) => {
  return new Promise((resolve,reject) => {
    mongoose.connect(url).then(() => {
      let book =  new Book({
        title:title,
        description:description,
        price:price,
        author:author,
        image:image,
        userId:userId
      })
      book.save().then(() => {
        mongoose.disconnect()
        resolve('Book added')
      }).catch((err) => {
        mongoose.disconnect()
        reject(err)
      })
    })
  })
}

exports.getMyBooksFunction = (userId) => {
  return new Promise((resolve,reject) => {
    mongoose.connect(url).then(() => {
      return Book.find({userId:userId})
    }).then((books) => {
      mongoose.disconnect()
      resolve(books)
    }).catch((err) => {
      mongoose.disconnect()
      reject(err)
    })
  })
}

exports.postUpdatePageFunction = (bookId,title,description,price,author,image) => {
  return new Promise((resolve,reject) => {
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(() => {
      return Book.updateOne({_id:bookId},{title:title,description:description,price:price,author:author,image:image})
    }).then((book) => {
      mongoose.disconnect()
      resolve('updated')
    }).catch((err) => {
      mongoose.disconnect()
      reject(err)
    })
  })
}

exports.deleteBookFunction = (id) => {
  return new Promise((resolve,reject) => {
    mongoose.connect(url).then(() => {
      return Book.deleteOne({_id:id})
    }).then(() => {
      mongoose.disconnect()
      resolve('deleted')
    }).catch((err) => {
      mongoose.disconnect()
      reject(err)
    })
  })
}