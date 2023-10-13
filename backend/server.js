const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.get('/api/places', (req, res, next) => {
    res.send('<h1>Places Go Here</h1>')
})

app.listen(5000)