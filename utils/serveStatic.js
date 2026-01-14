import fs from "node:fs/promises";
import path from "node:path";

import { sendResponse } from "./sendResponse.js";
import { getContentType } from "./getContentType.js";
import { send } from "node:process";

export async function serveStatic(req, res, baseDir) {
	const publicDir = path.join(baseDir, "public");
	const filePath = path.join(
		publicDir,
		req.url === "/" ? "index.html" : req.url,
	);

	try {
		const content = await fs.readFile(filePath);
		const ext = path.extname(filePath)
		console.log("I am ext", ext)
		const contentType = getContentType(ext)
		console.log("content laaa", contentType)

		sendResponse(res, 200, contentType, content);
	} catch (error) {
		console.log(error.code);

		if(error.code === "ENOENT") {

			const pathTo404 = path.join(publicDir, "404.html")
			const content404 = await fs.readFile(pathTo404)
	
			sendResponse(res, 404, "text/html", content404)
		} else {
			sendResponse(res, 500, "text/html", `<html><h1>Server Error: ${error.code}</h1></html>`)
		}

	}
}
