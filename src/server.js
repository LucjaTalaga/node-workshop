
const http = require('http');
const fs = require('fs');
const server = http.createServer(handler);
const message = 'I am so happy to be part of the Node Girls workshop!';

function handler (request, response) {

    let endpoint = request.url;
    let method = request.method;
    if(endpoint==='/'){
        console.log('jestem w /');
        response.writeHead(200, {"Content-Type": "text/html"});
        fs.readFile('../public/index.html', function(error, file) {
            if (error) {
                console.log(error);
                return;
            }

            response.end(file);
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
    console.log(endpoint);

}


server.listen(3000, function () {
    console.log("Server is listening on port 3000, lewaku!");
});