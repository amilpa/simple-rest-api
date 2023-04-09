require('dotenv').config()

const express = require('express')

const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscriber' , subscribersRouter)


app.listen(3000 , () => console.log('server started'))

