import http from "node:http"

import { serveStatic } from "./utils/serveStatic.js"

console.log("server on")

const PORT = 8000

const __dirname = import.meta.dirname
// console.log(__dirname, "hello")


const server = http.createServer((req, res) => {
    serveStatic("yum yum", __dirname)
    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
    res.end("<html><h1>Up and running!</h1></html>")
})

server.listen(PORT, console.log(`Server on port: ${PORT}`))