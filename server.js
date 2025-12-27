import fs from "node:fs/promises"
import http from "node:http"

import { serveStatic } from "./utils/serveStatic.js"

console.log("server on")

const PORT = 8000

const __dirname = import.meta.dirname
// console.log(__dirname, "hello")


const server = http.createServer(async (req, res) => {
    const pathToResource = serveStatic(__dirname)
    console.log("yayay", pathToResource)

    const content = await fs.readFile(pathToResource, "utf8")
    console.log(content)


    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
    res.end(content)
})

server.listen(PORT, () => console.log(`Server on port: ${PORT}`))