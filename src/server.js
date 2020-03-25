
const http = require('http');
const fs = require('fs');
const server = http.createServer(handler);
const message = 'I am so happy to be part of the Node Girls workshop!';
const types = {
    css: 'text/css',
    jpg: 'image/jpeg',
    js: 'application/javascript',
    ico: 'image/x-icon'
};

function handler (request, response) {

    let endpoint = request.url;
    let method = request.method;
    if(endpoint==='/'){
        fs.readFile('../public/index.html', function(error, file) {
            if (error) {
                console.log(error);
                return;
            }
            else {
                response.writeHead(200, {"Content-Type": "text/html"});
                response.end(file);
            }
        });
    }
    else if(endpoint ==='/node'){
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("It's node page");
        response.end();
    }
    else if(endpoint ==='/girls') {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("It's girls page");
        response.end();
    }
    else {
        fs.readFile(`../public/${endpoint}`, function(error, file) {
            if (error) {
                console.log(error);
                return;
            }
            else {
                let contentType = endpoint.split('.')[1];
                let fileType = types[contentType];
                response.writeHead(200, {"Content-Type": fileType});
                response.end(file);
            }
        });

    }


}


server.listen(3000, function () {
    console.log("Server is listening on port 3000, lewaku!");
});