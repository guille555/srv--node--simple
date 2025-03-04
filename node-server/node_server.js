const fs = require("fs");
const path = require("path");
const http = require("http");

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".jpg": "image/jpg",
  ".png": "image/png",
  ".gif": "image/gin",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".wav": "audio/wav",
  ".mp4": "video/mp4",
  ".woff": "application/font-woff",
  ".ttf": "application/font-ttf",
  ".eot": "application/font-eot",
  ".otf": "application/font-otf",
  ".wasm": "application/wasm",
};

http
  .createServer((req, res) => {
    const request_file = "." + req.url;
    let extension;

   if (request_file === "./") {
      fs.readFile("./index.html", (error, content) => {
        if (error) {
          console.error(error);
          res.end("end test");
        }
        console.log("serving index");
        res.writeHead(200, { "Content-Type": MIME_TYPES[".html"] });
        res.end(content);
      });
    } else {
      extension = String(path.extname(req.url)).toLowerCase();
      fs.readFile(request_file, (err, content) => {
        if (err) {
          console.error(err);
          res.end("end test");
        }
        console.log("serving other files");
        res.writeHead(200, { "Content-Type": MIME_TYPES[extension] });
        res.end(content);
      });
    }

    
  })
  .listen(8888, () => {
    console.log("running in port: 8888");
  });
