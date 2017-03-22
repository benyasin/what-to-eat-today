const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const db = require('./db')
const resolve = file => path.resolve(__dirname, file)
const api = require('./api')
const app = express()

// const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

app.set('port', (process.env.port || 3000))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use('/dist', express.static(resolve('../dist')))
app.use(api)

app.get('/', function (req, res) {
    res.sendFile(resolve('../dist/index.html'));
})

app.listen(app.get('port'), function () {
    console.log('Visit http://localhost:' + app.get('port'))
})