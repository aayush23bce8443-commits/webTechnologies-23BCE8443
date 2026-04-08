
const http = require('http');


const PORT = 3000;


const server = http.createServer((req, res) => {
    

    console.log(`Request received: ${req.method} ${req.url}`);

    
    res.setHeader('Content-Type', 'text/html');

    
    if (req.url === '/') {
        res.write('<h1>Welcome to Node.js Server</h1>');
        res.write('<p>This is the home page.</p>');
    } 
    else if (req.url === '/about') {
        res.write('<h1>About Page</h1>');
        res.write('<p>This is a simple Node.js web server application.</p>');
    } 
    else {
        res.write('<h1>404 Not Found</h1>');
    }

    
    res.end();
});


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});