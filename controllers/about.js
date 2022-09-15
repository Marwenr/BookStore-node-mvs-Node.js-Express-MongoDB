exports.getAboutPage = (req,res) => {
  res.render('pages/about', {verifUser:req.session.userId})
}