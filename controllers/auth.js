const authModel = require('../models/auth')

exports.getRegisterPageController = (req,res) => {
  res.render('pages/register', {verifUser:req.session.userId, message:req.flash('error')[0]})
}


exports.postRegisterData = (req,res) => {
  authModel.postRegisterFunction(req.body.username, req.body.email, req.body.password).then((user) => {
    res.redirect('/login')
  }).catch((err) => {
    res.redirect('/register')
    req.flash('error', err)
  })
}

exports.getLoginPageController = (req,res) => {
  res.render('pages/login', {verifUser:req.session.userId})
}

exports.postLoginData = (req,res) => {
  authModel.postLoginFunction(req.body.email,req.body.password).then((id) => {
    req.session.userId = id
    res.redirect('/')
  }).catch((err) => {
    res.redirect('/login')
    req.flash('error2', err)
  })
}

exports.logOutFunctionController = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
}