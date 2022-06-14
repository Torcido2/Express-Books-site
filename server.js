//jshint esversion:6

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const bodyParser = require("body-parser")
const indexRouter = require('./routes/index')

const app = express()

const ejs = require("ejs");
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true})

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('connection success!'))

//linia de cod de mai jos preia controlerul din fisierul routes. mai sus l-am definit.
app.use('/', indexRouter)

app.listen(process.env.PORT ||  3000)
