window.onload = function() {

  //check url for error params, quantities, and product items
let params = (new URL(document.location)).searchParams;
let q = Number(params.get('quantity'));
let error = params.get('error');
let items = params.get('items');

//if error, alert user
if (error) {
  alert(error);
  }
  const form = document.getElementById('productForm');
let formHTML = ''; //blank content of form to add to it

// Function to load JSON data from products.json
function loadProducts() {
  fetch('products.json')
    .then((response) => response.json())
    .then((data) => {
      // Process the JSON data and generate HTML for each product
      data.forEach((product) => {
        const productHTML = `
          <div class="col-sm-4">
            <div class="panel panel-primary">
              <div class="panel-heading">${product.name}</div>
              <div class="panel-body">
                <img src="${product.imageSrc}" class="img-responsive" style="width:100%" alt="${product.name}">
              </div>
              <div class="panel-footer">${product.description}<br>Price: $${product.price}</div>
            </div>
          </div>
        `;

        // Get the target element by its ID
        const container = document.getElementById("content-container");

        // Append the generated product HTML to the target element
        container.innerHTML += productHTML;
      });
    })
    .catch((error) => {
      console.error("Error loading products:", error);
    });
}


/*
//Use form data to populate products
if (items) {
  products = JSON.parse(items);
} else {
  products = {
    "Jordan 1 OG BRED": {
      "brand": "Jordan",
      "price": 400.0,
      "total_sold": 0
    },
    "Jordan 4 White Cement": {
      "brand": "Jordan",
      "price": 350.0,
      "total_sold": 0
    },
    "Jordan 5 UNC": {
      "brand": "Jordan",
      "price": 300.0,
      "total_sold": 0
    },
    "Jordan 6 Infrared": {
      "brand": "Jordan",
      "price": 240.0,
      "total_sold": 0
    },
    "Jordan 11 Concord": {
      "brand": "Jordan",
      "price": 280.0,
      "total_sold": 0
    },
    "Jordan 12 Flu Game": {
      "brand": "Jordan",
      "price": 240.0,
      "total_sold": 0
    },
    }
}
}
//Writing loop to print Product information and adding quantity box
for (let i in products) {
  formHTML += `<h3>${products[i]["brand"]} at \$${products[i]["price"]} (${products[i]["total_sold"]} sold)</h3>`;
  formHTML += `<label for="qty_textbox${i}">Quantity Desired:</label>
  <input type = "text" name = "quantity_textbox${i}" name = "quantity_textbox[${i}]" onkeyup = "checkQuantityTextbox(this);">
  <span id = "quantity_textbox[${i}]_message">Enter a 
  quantity</span><br>`;
}
*/


//Ensuring submit button is part of form
formHTML += `<input type="submit" value="Submit">`;
form.innerHTML = formHTML;

//add the checkQuantityTextbox()
function checkQuantityTextbox(theTextbox) {
  let errs = validateQuantity(theTextbox.value, true);
  document.getElementById(theTextbox.name + '_message').innerHTML = errs;
}

//Validating Quantity

function validateQuantity (quantity) {
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
      default:
          errorMessage = ""; //No errors
          break;
  }

  return errorMessage;

  }}