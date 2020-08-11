const express = require("express")
const db = require("../data/db")
const router = express.Router()

router.get("/", (req, res) => {
    res.json({
        message: "Hello!"
    })
})



router.post("/api/posts", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            errorMessage: "Please provide a title and contents for the post."
        })
    } else {
        db.insert(req.body)
        .then(post => {
            res.status(200).json(req.body)
    
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                errorMessage: "There was an error while saving to the database"
            })
        })
    }
    

})
//500 internal server error

/********************************/

router.post("/api/posts/:id/comments", (req, res) => {
    const newComment = db.findById(req.params.id)
    if (!newComment) {
        res.status(404).json({
            errorMessage: "The post with the specified ID does not exist"
        })
    } else if (!req.body.text) {
        res.status(400).json({
            errorMessage: "Please provide text for the comment"
        })
    } else {
        db.insertComment(req.body)
        .then(comment => {
            res.status(200).json(req.body)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                errorMessage: "There was an error while saving your comment"
            })
        })
    }



})
//404 post_id does not exist

/********************************/


router.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "There was an error with the database"
        })
    })
})


/*********************************/

router.get("/api/posts/:post_id", (req, res) => {
    db.findById(req.params.post_id)
    .then(post => {
        if (post.length === 0) {
            return res.status(404).json({
                errorMessage: "There is no post by this ID"
            })
        } else {
           return res.status(200).json(post)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "There was an error with the database"
        })
    }) 
})
//500 error with the database

/*********************************/

router.get("/api/posts/:id/comments", (req, res) => {
    db.findPostComments(req.params.id)
    .then(comments => {
        if (!comments) {
            return res.status(404).json({
                errorMessage: "There are no comments associated with this post"
            })
        } else {
            return res.status(200).json(comments)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "There was an error with the database"
        })
    })

})
//500 error with the database

/*********************************/ 

router.delete("/api/posts/:id", (req, res) => {
    db.findById(req.params.id)
    .then(post => {
        if (post.length === 0) {
            res.status(404).json({
                errorMessage: "This post does not exist"
            })
        } else {
            db.remove(req.params.id)
            .then(post => {
               res.status(200).json(post) 
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    errorMessage: "There was an error with the database"
                })
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "There was an error with the database"
        })
    })
})
//500 id is not defined

/*********************************/

router.put("/api/posts/:id", (req, res) => {
    db.findById(req.params.id)
    .then(post => {
        if(post.length == 0) {
            res.status(404).json({
                errorMessage: "Post does not exist"
            })
        } else if (!req.body.title || !req.body.contents) {
            res.status(400).json({
                errorMessage: "There must be a title or contents"
            })
        } else {
            db.update(req.params.id, req.body)
            .then(post => {
                res.status(200).json(post)
            })
            .catch(err => {
                res.status(500).json({
                    errorMessage: "There was an error with the database"
                })
            })
        }
    })
   
})

module.exports = router;