import http from "node:http"

console.log("server on")

const PORT = 8000

const server = http.createServer(async(req, res) => {
    res.setHeader("Content-Type", "text-html")
    res.statusCode = 200
    res.end("<html><h1>Up and running</h1></html>")
})

server.listen(PORT, console.log(`Server on port: ${PORT}`))