const fs = require('fs');
const querystring = require('querystring');
const message = 'I am so happy to be part of the Node Girls workshop!';
const types = {
    css: 'text/css',
    jpg: 'image/jpeg',
    js: 'application/javascript',
    ico: 'image/x-icon',
    png: 'image/png'
};

function handler(request, response) {

    let endpoint = request.url;
    if (endpoint === '/') {
        indexHandler(response);
    }
    else if (endpoint === '/create/post') {
        createPostHandler (request, response);
    }
    else if (endpoint==='/posts.json'){
        loadPosts (response);
    }
    else {
        contentHandler(endpoint, response);
    }
}

function indexHandler(response) {
    fs.readFile('../public/index.html', function (error, file) {
        if (error) {
            console.log(error);
            return;
        } else {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.end(file);
        }
    });
}

function contentHandler(endpoint, response) {
    fs.readFile(`../public/${endpoint}`, function (error, file) {
        if (error) {
            console.log(error);
            return;
        } else {
            let contentType = endpoint.split('.')[1];
            let fileType = types[contentType];
            response.writeHead(200, {"Content-Type": fileType});
            response.end(file);
        }
    });
}

function createPostHandler (request, response) {
    let allTheData = '';
    let date = Date.now();
    request.on('data', function (chunkOfData) {
        allTheData += chunkOfData;
    });
    request.on('end', function () {
        let convertedData = querystring.parse(allTheData);
        console.log(convertedData);
        response.writeHead(301, {"Location": "/"});
        addPost(convertedData, date, response);
    });
}

function loadPosts (response) {
    fs.readFile('./posts.json', function (error, file) {
        if (error) {
            console.log(error);
            return;
        }
        else {
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(file);
        }
    });
}

function addPost (data, time, response) {
    fs.readFile('./posts.json', function (error, file) {
        if (error) {
            console.log(error);
            return;
        }
        else {
            const postsList = JSON.parse(file);
            postsList[time] = data.post;
            const jsonToWrite = JSON.stringify(postsList);
            fs.writeFile('./posts.json', jsonToWrite, (err, data) => {//Zapisz plik
                if (err) {
                    console.log('Błąd zapisu pliku', err);
                    res.send('Wystąpił błąd zapisu.');
                }
                else {
                    response.end();
                }
            });
        }
    });
}
module.exports = handler;