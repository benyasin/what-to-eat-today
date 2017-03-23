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


router.get('/api/fetchAllByPid/:pid', (req, res) => {
    let pid = req.params.pid;
    db.Category.find({parentId: pid * 1}, (err, doc) => {
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


router.get('/api/fetchRandomRecipe/:cid', (req, res) => {
    let cid = req.params.cid;
    db.Recipe.count({categories: {$elemMatch: {id: cid * 1}}, score: {$gte: 7}}, (err, total) => {
        if (err) {
            console.log(err)
        } else if (total) {
            if (total > 0) {
                let rIndex = Math.floor(Math.random() * total);
                db.Recipe.find({categories: {$elemMatch: {id: cid * 1}}, score: {$gte: 7}}).skip(rIndex).limit(1).exec(function (err, doc) {
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
            else{
                res.send({})
            }
        }
    })
})


module.exports = router
