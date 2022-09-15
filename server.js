const express = require('express')
const app = express()
const homeRouter = require('./routers/home.route')
const aboutRouter = require('./routers/about.route')
const bookRouter = require('./routers/book.route')
const authRouter = require('./routers/auth.route')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(flash());

var store = new MongoDBStore({
  uri: 'mongodb+srv://marwen:marwen@cluster0.maa5ozc.mongodb.net/?retryWrites=true&w=majority',
  collection: 'mySessions'
});

app.use(session({
  secret:'this is secret',
  store:store,
  resave:true,
  saveUninitialized:true,
}))


app.use('/', homeRouter)
app.use('/', aboutRouter)
app.use('/', bookRouter)
app.use('/', authRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('server runing')
})