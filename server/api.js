const express = require('express')
const router = express.Router()
const db = require('./db')


router.get('/api/fetchAllByGrade/:grade', (req, res) => {
    let grade = req.params.grade;
    db.Category.find({grade: grade * 1}, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(500).end()
        } else if (doc) {
            res.send(doc)
            res.status(200).end()
        }
    })
})


router.get('/api/fetchAllByNames/:names', (req, res) => {
    let names = req.params.names;
    let nameArray = names.split(',');
    db.Category.find({name: {$in: nameArray}}, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(500).end()
        } else if (doc) {
            res.send(doc)
            res.status(200).end()
        }
    })
})


router.get('/api/fetchOneById/:id', (req, res) => {
    let id = req.params.id;
    db.Category.findOne({grade: id}, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(500).end()
        } else if (doc) {
            res.send(doc)
            res.status(200).end()
        }
    })
})


router.get('/api/fetchRandomRecipe/:cid/:cname', (req, res) => {
    let cid = req.params.cid;
    let cname = req.params.cname;

    db.Recipe.count({categories: {$elemMatch: {id: cid * 1, name: cname}}}, (err, total) => {
        if (err) {
            console.log(err)
        } else if (total) {
            if (total > 0) {
                let rIndex = Math.floor(Math.random() * total);
                rIndex = (rIndex === total ? rIndex - 1 : rIndex);
                db.Recipe.find({
                    categories: {
                        $elemMatch: {
                            id: cid * 1,
                            name: cname
                        }
                    }
                }).skip(rIndex).limit(1).exec(function (err, doc) {
                    if (err) {
                        console.log(err)
                        res.status(500).end()
                    } else if (doc) {
                        if (doc.length > 0) {
                            res.send(doc[0])
                        } else {
                            res.send({})
                        }
                        res.status(200).end()
                    }
                })
            }
        }
    })
})


module.exports = router
