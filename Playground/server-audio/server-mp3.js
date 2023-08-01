//serve-mp3.js
var http = require("http");
var fs = require("fs");
http
  .createServer(function (req, res) {
    console.log("Port Number : 3000");
    // change MIME type to 'audio/mp3'
    res.writeHead(200, { "Content-Type": "audio/mp3" });
    fs.exists("001.mp3", function (exists) {
      if (exists) {
        var rstream = fs.createReadStream("001.mp3");
        rstream.pipe(res);
      } else {
        res.end("Its a 404");
      }
    });
  })
  .listen(3000);
