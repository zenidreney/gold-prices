import http from "node:http";
import { getPrices } from "./utils/randomGoldPriceGen.js";
import { serveStatic } from "./utils/serveStatic.js";

console.log("server on");

const PORT = 8000;

const __dirname = import.meta.dirname;
// console.log(__dirname, "hello")

const server = http.createServer(async (req, res) => {
	if (req.url === "/api/prices") {
		const price = getPrices();
		console.log(price)

		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify(price));
		return
	}

	await serveStatic(req, res, __dirname);
});

server.listen(PORT, () => console.log(`Server on port: ${PORT}`));
