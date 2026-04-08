const express = require('express');
const app = express();
const PORT = 3000;



app.use((req, res, next) => {
    console.log(`Method: ${req.method}, URL: ${req.url}, Time: ${new Date().toLocaleString()}`);
    next(); 
});


app.use((req, res, next) => {
    console.log("Global Middleware 2 executed");
    next();
});




const checkUser = (req, res, next) => {
    console.log("Route-specific middleware executed");
    next();
};




app.get('/', (req, res) => {
    res.send("Home Page");
});


app.get('/user', checkUser, (req, res) => {
    res.send("User Page with middleware");
});


app.get('/chain',
    (req, res, next) => {
        console.log("Middleware 1 in chain");
        next();
    },
    (req, res, next) => {
        console.log("Middleware 2 in chain");
        next();
    },
    (req, res) => {
        res.send("Middleware chaining complete");
    }
);



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});