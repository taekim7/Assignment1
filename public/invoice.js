//invoice.js



/*
//url params
const params = (new URL (document.location)).searchParams;
//empty order array
let quantities = [];
let itemData = products;

console.log(params);

for (let i = 0; i < itemData.length; i++) {
  let quantityValue = params.get(`quantity${i}`);
  if (quantityValue !== null){
    quantity [itemData[i].quantityIndex] = Number (quantityValue);
  }
}

// Parse quantities from URL parameters
for (let i = 0; i < products.length; i++) {
  const paramName = `qty${i}`;
  const paramValue = getParameterByName(paramName);
  quantities.push(paramValue ? parseInt(paramValue) : 0);
}


// Handle the form submission response
document.getElementById('productForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const actionUrl = this.action;

  fetch(actionUrl, {
      method: 'POST',
      body: new FormData(this),
  })
  .then(response => response.json()) // Parse the JSON response
  .then(invoiceData => {
      // Update the invoice page with the received data
      updateInvoicePage(invoiceData);
  })
  .catch(error => console.error('Error submitting the form:', error));
});




// Function to update the invoice page with data
function updateInvoicePage(invoiceData) {


function getQuantities() {
  let quantity = [];
  document.querySelectorAll('.quantity-input').forEach(input => {
    quantity.push(Number(input.value));
  });
  return quantity;
}


// Get the receipt parameter from the URL
let receiptContent = getParameterByName('invoice');

// Display the receipt content
document.getElementById('invoiceContent').innerHTML = invoiceContent;



// Variables for subtotal, tax, shipping charge, and total
let subtotal = 0;
let taxRate = 0.04;
let taxAmount = 0;
let total = 0;
let shippingCharge = 0;

//extended price
let extendedPrice = product.price * itemQuantity;
subtotal += extendedPrice;


// Calculate shipping
if (subtotal <= 200) {
  shippingCharge = 15;
} else if (subtotal <= 400) {
  shippingCharge = 20;
} else {
  shippingCharge = subtotal * 0.04;
}

// Calculate total with shipping
taxAmount = subtotal * taxRate;
total = subtotal + taxAmount + shippingCharge;

// Setting total cell
document.getElementById('total_cell').innerHTML = `$${total.toFixed(2)}`;
// Setting subtotal, tax, and total cells
document.getElementById('subtotal_cell').innerHTML = '$' + subtotal.toFixed(2);
document.getElementById('tax_cell').innerHTML = '$' + taxAmount.toFixed(2);
document.getElementById('shipping_cell').innerHTML = '$' + shippingCharge.toFixed(2);

// Validate Quantity
function validateQuantity(quantity) {
  if (isNaN(quantity)) {
    return "Not a number";
  } else if (quantity < 0 && !Number.isInteger(quantity)) {
    return "Negative Inventory and not an integer";
  } else if (quantity < 0) {
    return "Negative Inventory";
  } else if (!Number.isInteger(quantity)) {
    return "Not an integer";
  } else {
    return "";
  }
}

// Function to generate table rows and apply quantity validation
function generateItemRows() {
  let table = document.getElementById('invoiceTable');
  table.innerHTML = '';
  let hasErrors = false;

  let quantity = getQuantities();

  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    let itemQuantity = quantity[product.quantityIndex];

    let validationMessage = validateQuantity(itemQuantity);
    if (validationMessage !== "") {
      hasErrors = true;
      let row = table.insertRow();
      row.insertCell(0).innerHTML = product.name;
      row.insertCell(1).innerHTML = validationMessage;
    } else if (itemQuantity > 0) {
      let extendedPrice = product.price * itemQuantity;
      subtotal += extendedPrice;

      // Create a new row
      let row = table.insertRow();

      // Insert cells into the row
      let imageCell = row.insertCell(0);
      let nameCell = row.insertCell(1);
      let quantityCell = row.insertCell(2);
      let priceCell = row.insertCell(3);
      let extendedPriceCell = row.insertCell(4);

      // Set the content for each cell
      imageCell.innerHTML = `<img src="${product.image}" alt="${product.name}" style="width: 50px; height: auto;" />`;
      nameCell.innerHTML = product.name;
      quantityCell.innerHTML = itemQuantity;
      priceCell.innerHTML = '$' + product.price.toFixed(2);
      extendedPriceCell.innerHTML = '$' + extendedPrice.toFixed(2);
    }
  }

      /*
      let row = table.insertRow();
      row.insertCell(0).innerHTML = product.name;
      row.insertCell(1).innerHTML = itemQuantity;
      row.insertCell(2).innerHTML = '$' + product.price.toFixed(2);
      row.insertCell(3).innerHTML = '$' + extendedPrice.toFixed(2);
}}
      */
    
/*
  // If no error, display total
  if (!hasErrors) {
    document.getElementById('total_cell').innerHTML = '$' + total.toFixed(2);
  }
}
}

 // Access the data from the JSON response
 const products = invoiceData.products;
 const total = invoiceData.total;

 // Update the invoice page elements accordingly
 document.getElementById('total_cell').innerHTML = `$${total.toFixed(2)}`;
 */






 //url params
const params = (new URL (document.location)).searchParams;
//empty order array
let quantities = [];

// Parse quantities from URL parameters
for (let i = 0; i < products.length; i++) {
  const paramName = `qty${i}`;
  const paramValue = getParameterByName(paramName);
  quantities.push(paramValue ? parseInt(paramValue) : 0);
}
function getParameterByName(name) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Function to update the invoice page with data
function updateInvoicePage(invoiceData) {
  // Access the productData and total from the server response
  const productData = invoiceData.products;
  const total = invoiceData.total;

  // Use productData and total to update the invoice page accordingly
  // For example, you can loop through productData and update the invoice table dynamically
  let table = document.getElementById('invoiceTable');
  table.innerHTML = '';

  // Loop through productData and update the invoice table
  for (let i = 0; i < productData.length; i++) {
    let product = productData[i];

    let row = table.insertRow();
    row.insertCell(0).innerHTML = `<img src="${product.image}" alt="${product.name}" style="width:50px; height: auto;"/>`;
    row.insertCell(1).innerHTML = product.name;
    row.insertCell(2).innerHTML = quantities[i];
    row.insertCell(3).innerHTML = '$' + product.price.toFixed(2);
    row.insertCell(4).innerHTML = '$' + (quantities[i] * product.price).toFixed(2);
  }

  // Update subtotal, tax, shipping charge, and total based on productData
  let subtotal = 0;
  let taxRate = 0.04;
  let taxAmount = subtotal * taxRate;
  let shippingCharge = 0;

  for (let i = 0; i < productData.length; i++) {
    subtotal += quantities[i] * productData[i].price;
  }

  // Calculate shipping
  if (subtotal <= 200) {
    shippingCharge = 15;
  } else if (subtotal <= 400) {
    shippingCharge = 20;
  } else {
    shippingCharge = subtotal * 0.04;
  }

  // Calculate total with shipping
  let totalAmount = subtotal + taxAmount + shippingCharge;

  // Update cells in the table
  document.getElementById('subtotal_cell').innerHTML = '$' + subtotal.toFixed(2);
  document.getElementById('tax_cell').innerHTML = '$' + taxAmount.toFixed(2);
  document.getElementById('shipping_cell').innerHTML = '$' + shippingCharge.toFixed(2);
  document.getElementById('total_cell').innerHTML = '$' + totalAmount.toFixed(2);
}

// Handle the form submission response
document.getElementById('productForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const actionUrl = this.action;

  fetch(actionUrl, {
      method: 'POST',
      body: new FormData(this),
  })
  .then(response => response.json()) // Parse the JSON response
  .then(invoiceData => {
      // Update the invoice page with the received data
      updateInvoicePage(invoiceData);
  })
  .catch(error => console.error('Error submitting the form:', error));
});

// Other existing code in your invoice.js file...
