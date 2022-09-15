const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const authSchema = mongoose.Schema({
  username:String ,
  email:String,
  password:String,
})

const User = mongoose.model('user', authSchema)
const url = 'mongodb+srv://marwen:marwen@cluster0.maa5ozc.mongodb.net/?retryWrites=true&w=majority'

exports.postRegisterFunction = (username, email, password) => {
  return new Promise((resolve,reject) => {
    mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology:true}).then(() => {
      return User.findOne({email:email})
    }).then((user) => {
      if(user) {
        mongoose.disconnect()
        reject('email is used')
      } else {
        return bcrypt.hash(password,10)
      }
    }).then((hpassword) => {
      let user = new User({
        username:username,
        email:email,
        password:hpassword,
      })
      return user.save()
    }).then((user) => {
      mongoose.disconnect()
      resolve('registred')
    }).catch((err) => {
      mongoose.disconnect()
      reject(err)
    })
  })
}


exports.postLoginFunction = (email,password) => {
  return new Promise((resolve,reject) => {
    mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology:true}).then(() => {
      return User.findOne({email:email})
    }).then((user) => {
      if(user) {
        bcrypt.compare(password,user.password).then((verif) => {
          if(verif) {
              mongoose.disconnect()
              resolve(user._id)
          } else {
            mongoose.disconnect()
            reject('invalid password')
          }
        })
      }else {
        mongoose.disconnect()
        reject('The email you entered does not belong to any account')
      }
    }).catch(() => {
      reject(err)
    })
  })
}