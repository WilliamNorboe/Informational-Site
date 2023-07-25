const path = require('path');
const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer( function(req, res){
    const pathname = url.parse(req.url, true).pathname;
    let filename = "pages/index.html";
    if(pathname !== "/"){
        filename = "pages" + pathname + ".html";
    }
    fs.readFile(filename, function(err, data){
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'});
            fs.readFile("pages/404.html", (err, data)=>{
                res.write(data);
                return res.end();
            });
        }
        else{
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        }
    });
}).listen(8080);