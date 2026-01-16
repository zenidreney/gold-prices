import http from "node:http";
import { getPrices } from "./utils/randomGoldPriceGen.js";
import { serveStatic } from "./utils/serveStatic.js";
import { sendResponse } from "./utils/sendResponse.js";

console.log("server on");

const PORT = 8000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
	if (req.url === "/api/prices") {
		const price = getPrices();

		sendResponse(res, 200, "application/json", JSON.stringify({ price }));

		return;
	}

	await serveStatic(req, res, __dirname);
});

server.listen(PORT, () => console.log(`Server on port: ${PORT}`));
