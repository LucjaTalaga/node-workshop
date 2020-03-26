const http = require('http');
const handler = require('./handler');
const server = http.createServer(handler);

server.listen(3000, function () {
    console.log("Server is listening on port 3000, lewaku!");
});