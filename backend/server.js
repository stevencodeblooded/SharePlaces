const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const placesRoutes = require('./routes/places-routes')
const usersRoutes = require('./routes/users-routes')  

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/assets', express.static('assets'))

app.use('/api/places', placesRoutes)
app.use('/api/users', usersRoutes)

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p3mcyyf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(()=> {
        app.listen(5000)
    })
    .catch(err => console.log(err))