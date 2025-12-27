import http from "node:http";
import { serveStatic } from "./utils/serveStatic.js";

console.log("server on");

const PORT = 8000;

const __dirname = import.meta.dirname;
// console.log(__dirname, "hello")

const server = http.createServer(async (req, res) => {
	await serveStatic(req, res, __dirname);
});

server.listen(PORT, () => console.log(`Server on port: ${PORT}`));
