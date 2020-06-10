
const express = require("express");
const server = express();
const post = require("./post");
server.use(post)


const port = 4000;
server.listen(port, () => {
    console.log("Listening on port: ", port)
})