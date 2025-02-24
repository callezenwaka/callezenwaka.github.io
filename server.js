// server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html'; // Serve index.html by default
    } else if (filePath.endsWith('/')) {
        filePath += 'index.html'; // Handle directory requests
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        // Add more content types as needed
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') { // 404
                fs.readFile('./404.html', (err, content) => { //Custom 404 page
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                });
            } else { // 500 (other errors)
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>Internal Server Error</h1>');
                console.error(err);
            }
        } else { // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

const port = process.env.PORT || 3000; // Use environment variable or default 3000

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});