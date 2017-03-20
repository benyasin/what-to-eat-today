const mongoose = require('mongoose')
const examples = require('./examples.json')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: String,
})

const recipeSchema = new Schema({
    name: String,
})

const Models = {
    Category: mongoose.model('Category', categorySchema),
    Recipe: mongoose.model('Recipe', recipeSchema),
    initialized: false
}

const initialize = function () {
    Models.Category.count({}, function (err, doc) {
        if (err) {
            console.log(err)
        } else if (doc === 0) {
            console.log('Database opens for the first time...')
            Promise.all(examples.map(item => new Models[item.type](item).save()))
                .then(() => console.log('Initialize successfully.'))
                .catch(() => console.log('Something went wrong during initializing.'))
        } else {
            Models.initialized = true
        }
    })
}

mongoose.connect('mongodb://127.0.0.1/food')
mongoose.set('debug', true)

const db = mongoose.connection

db.on('error', function () {
    console.log('Database connection error.')
})

db.once('open', function () {
    console.log('The database has connected.')
    initialize()
})

module.exports = Models