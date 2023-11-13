//server.js

// Importing the Express.js framework 
const express = require('express');
// Create an instance of the Express application called "app"
// app will be used to define routes, handle requests, etc
const app = express();



// Route all other GET requests to serve static files from a directory named "public"
app.use(express.static(__dirname + '/public'));

//app.get for test was executed
app.get('/test', function(req, res){
	res.send('app.get for test was executed');
	console.log('app.get for test was executed');
})


/* Import data from a JSON file containing information about products
__dirname represents the directory of the current module (where server.js is located)
__dirname + "./products.json" specifies the location of products.json
*/
let products = require(__dirname + '/products.json');
products.forEach( (prod,i) => {prod.total_sold = 0});






// Example using fs.promises.readFile (asynchronous)
const fs = require('fs').promises;

// Use an asynchronous function to load products
async function loadProducts() {
    try {
        const data = await fs.readFile('products.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading products:', error);
        return [];
    }
}
//load products once the server starts
async function loadProducts() {
    try{
        let data = await FileSystem.readFile(__dirname + '/products.json');
        products = JSON.parse(data);
    } catch (err) {
        console.error('Error loading products: ' + err);
    }
    }







    
// Define a route for handling a GET request to a path that matches "./products.js"
app.get('/products.js', function(request, response, next) {
	// Send the response as JS
	response.type('.js');
	// Create a JS string (products_str) that contains data loaded from the products.json file
	// Convert the JS string into a JSON string and embed it within variable products
	const products_str = `let products = ${JSON.stringify(products)};`;
	// Send the string in response to the GET request
	response.send(products_str);
});

app.use(express.urlencoded({ extended: true }));

// Monitor all requests regardless of their method (GET, POST, PUT, etc) and their path (URL)
app.all('*', function (request, response, next) {
	console.log(request.method + ' to ' + request.path);
	next();
 });


//Process Form Stuff
 app.post("/process_form", function (request, response) {

    //retrieve quantities from textbox input in array
    let qtys = request.body[`quantity_textbox`];
    let valid = true;
    let url = '';
    let soldArray = [];

    for (i in qtys){
        let q = Number(qtys[i]);
        
        if (validateQuantity(q)==''){
            if (products[i]['qty_available'] - Number(q) < 0) {
                valid = false;
                url += `&prod${i}=${q}`
            }else{
                soldArray[i] = Number(q);
                url += `&prod${i}=${q}`
            }
            }
            else {
                valid = false;
                url += `&prod${i}=${q}`
            }
            if (url ==`&prod0=0&prod1=0&prod2=0&prod3=0&prod4=0&prod5=0`){
                valid = false;
            }
        }
    if (valid == false)
    {
        response.redirect(`${url}?error=true` + url);
    }
    else {
        for (i in qtys)
        {
            products[i]['total_sold'] += soldArray[i];
            products[i]['qty_available'] -= soldArray[i];
        }
        response.redirect('invoice.html?' + url);
    }
})

    /*
    // Loop through the products
    for (let i in products) {
      let qty = Number(request.body[`quantity_textbox${i}`]);
      let validationMessage = validateQuantity(qty, products[i]["qty_available"]);
  
      // Validate quantity
      if (validationMessage === "") {
        // Update the quantities array
        quantities.push(qty);
  
        // Append information to the URL string
        url += `&prod${i}=${qty}`;
      } else {
        hasValidationErrors = true;
        break; // Break the loop if there is an error
      }
    }
  
    // If there are validation errors, redirect to the store with an error parameter
    if (hasValidationErrors) {
      response.redirect(`${url}?error=true`);
    } else {
      // If there are no errors, update quantities in the products array
      for (let i in products) {
        // Assuming products is an array of items with a corresponding index
        products[i]['qty_available'] -= quantities[i];
        products[i]['total_sold'] += quantities[i];
      }
  
      // Redirect to invoice.html with relevant data
      response.redirect(`/invoice.html${url}`);
    }
  });
*/



/*
// Process form
app.post("/process_form", function (request, response) {
    let hasValidationErrors = false;
    let url = '/store'; // Redirect URL for store page
    let quantities = [];
  

    // Loop through the products
    for (let i in products) {
      let qty = Number(request.body[`quantity_textbox${i}`]);
      let validationMessage = validateQuantity(qty, products[i]["qty_available"]);
  
      // Validate quantity
      if (validationMessage === "") {
        // Update the quantities array
        quantities.push(qty);
  
        // Append information to the URL string
        url += `&prod${i}=${qty}`;
      } else {
        hasValidationErrors = true;
        break; // Break the loop if there is an error
      }
    }
  
    // If there are validation errors, redirect to the store with an error parameter
    if (hasValidationErrors) {
      response.redirect(`${url}?error=true`);
    } else {
      // If there are no errors, update quantities in the products array
      for (let i in products) {
        // Assuming products is an array of items with a corresponding index
        products[i]['qty_available'] -= quantities[i];
        products[i]['total_sold'] += quantities[i];
      }
  
      // Redirect to invoice.html with relevant data
      response.redirect(`/invoice.html${url}`);
    }
  });
*/

/*
// Redirect route
app.get('./public/invoice.html', function (request, response) {
    // You can include any necessary logic or data here before rendering the receipt page
    response.sendFile(__dirname + './public/invoice.html');
});
*/

 // Start the server; listen on port 8080 for incoming HTTP requests
 app.listen(8080, () => console.log(`listening on port 8080`));


// Validate Quantity
function validateQuantity(quantity, maxQuantity) {
    let errorMessage = "";

    switch (true) {
        case isNaN(quantity):
            errorMessage = "Not a number. Please enter a non-negative quantity to order.";
            break;
        case quantity <= 0 && !Number.isInteger(quantity):
            errorMessage = "Negative inventory and not an Integer. Please enter a non-negative quantity to order.";
            break;
        case quantity <= 0:
            errorMessage = "Negative inventory. Please enter a non-negative quantity to order.";
            break;
        case !Number.isInteger(quantity):
            errorMessage = "Not an Integer. Please enter a non-negative quantity to order.";
            break;
        case quantity > maxQuantity:
            errorMessage = `Quantity exceeds the available stock (${maxQuantity}). Please enter a valid quantity.`;
            break;
        default:
            errorMessage = ""; // No errors
            break;
    }

    return errorMessage;
}