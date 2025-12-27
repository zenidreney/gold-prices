export function getContentType(ext) {

    const types = {
     ".js": "text/javascript",
     ".css": "text/css",
     ".json": "application/json",
     ".png": "image/png",
     ".jpg": "image/jpeg",
     ".jpeg": "image/jpeg",
     ".gif": "image/gif",
     ".svg": "image/svg+xml"
   }
   console.log("hello mello", types[ext.toLowerCase()])

    return types[ext.toLowerCase()] || "text/html"
}