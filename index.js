const express = require("express");
const server = express();

const postRouter = require("./routers/post-router")

server.use(express.json()) //WHY?

server.use(postRouter)


const port = 4000;

server.listen(port, () => {
    console.log("Listening on port: ", port)
})