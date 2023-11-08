//Server.js

// Importing the Express.js framework 
const express = require('express');
let fs = require('fs');
let path = require ('path');

// Create an instance of the Express application called "app"
// app will be used to define routes, handle requests, etc
const app = express();
let port = 8080;

// Monitor all requests regardless of their method (GET, POST, PUT, etc) and their path (URL)
app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});

app.get("/products.js", function (request, response, next) {
   response.type('.js');
   let products_str = `let products = ${JSON.stringify(products)};`;
   response.send(products_str);
});


// Route all other GET requests to serve static files from a directory named "public"
app.use(express.static(path.join(__dirname, 'public')));

// Create a route to serve product data from 'products.json'
app.get('/api/products', (req, res) => {
   fs.readFile('products.json', 'utf8', (err, data) => {
     if (err) {
       console.error(err);
       res.status(500).json({ error: 'Internal Server Error' });
       return;
     }
     const products = JSON.parse(data);
     res.json(products);
   });
 });

// Start the server; listen on port 8080 for incoming HTTP requests
app.listen(8080, () => { console.log(`listening on ${port}`); }
);