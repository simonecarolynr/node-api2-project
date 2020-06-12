const express = require("express");
const router = express.Router();
const db = require("./data/db");

//ADD A BLOG
router.post("/api/posts", (req, res) => {

    if(!req.title && !req.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and sontents for the post"
        })
    }
    db.insert(req.body)
    .then(post => {
        res.status(201).json(post)
    })
    .err(err => {
        res.status(500).json({
            err: "There was an error while saving the post to the database"
        })
    })
})

//ADD A COMMENT
router.post("/api/posts/:id/comments", (req, res) => {

    if(!req.post_id){
        res.status(404).json({
            message: "The post with the specifiec ID does not exist"
        })
    }

    if(!req.text){
        res.status(400).json({
            errorMessage: "Please provide text for the comment."
        })
    }

    db.insertComment(req.body.post_id) 
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        res.status(500).json({
            error: "There was an error while saving the comment to the database"
        })
    })
})

//GET ALL THE BLOGS
router.get("/api/posts", (req, res) => {
    db.find(req.body)
    .then((post) => {
        res.status(200).json(post) 
    })
    .catch((err) => {
        res.status(500).json({
            err: "The post's information could not be retrieved"
        })
    })
})

//GET BLOG BY ID
router.get("/api/posts/:id", (req, res) => {
    if(!req.params.id){
        res.status(404).json({
            err: "The posts with the specified ID does not exist"
        })
    }
    db.findById(req.params.id)
    .then((post) => {
        res.status(200).json(post) 
    })
    .catch((err) => {
        res.status(500).json({
            err: "The post information could not be retrieved"
        })
    })
})

//GET ALL THE COMMENTS ASSOCIATED WITH THE BLOG
router.get("/api/posts/:id/comments", (req, res) => {
    if(!req.params.id){
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    }

    db.findPostComments(req.params.id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({
            err: "The comment's information could not be retrieved"
        })
    })
})

//DELETE POST
router.delete("/api/posts/:id", (req, res) => {

    if(!req.params.id){
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    }

    db.remove(req.params.id)
    .then((post) => {
        res.status(200).json({
            message: "This post has been deleted"
        })
    })
    .catch((err) => {
        res.status(500).json({
            err: "The post could not be removed"
        })
    })

    return req.body
})

//UPDATE POST BY ID
router.put("/api/posts/:id", (req, res) => {

    if(!req.params.id){
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    }

    if(!req.body.title || !req.body.contents){
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post"
        })
    }
    db.update(req.params.id, req.body)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({
            err: "The post information could not be modified"
        })
    })
})


module.exports = router;
