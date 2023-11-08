//Index.js

//declare and push to the DOM the store name at top and bottom
const store_name="Cool Shoe Store";
top_title.innerHTML=(store_name);
//send store name infor to the footer title
bottom_title.innerHTML=("Wear History. It's cool.");

// Fetch product data from the server
fetch("/get_products")
    .then((response) => response.json())
    .then((data) => {
        // Handle the retrieved data
        const products = data; // Assuming the server sends an array of products
        displayProducts(products);
    })
    .catch((error) => {
        console.error("Error fetching product data:", error);
    });

function displayProducts(products) {
  const productContainer = document.getElementById("product_stuff");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const { name, price, quantity, image } = product;
    const labelId = `${name}_label`;
    const spanId = `${name}`;

    productDiv.innerHTML = `
      <h2>${name}</h2>
      <p>$${price}</p>
      <label id="${labelId}">Quantity</label>
      <input type="text" placeholder="0" name="${name}" onkeyup="checkQuantityTextbox(this);">
      <span id="${spanId}">Remaining Quantity: ${quantity}</span>
      <img src="${image}">
    `;

    productContainer.appendChild(productDiv);
  });
}
  
  

function isNonNegInt(q, return_errors = false) {
    errors = []; // assume no errors at first
    if (q === '') {
        q = 0; // handle blank inputs as if they are 0
    }
    if (isNaN(q)) {
        errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
    } else {
        const num = parseInt(q);
        if (num < 0) {
            errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
        } else if (num !== parseFloat(q)) {
            errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
        }
    }
    return return_errors ? errors : (errors.length === 0);
}

    function checkQuantityTextbox(theTextbox) {
        errs = isNonNegInt(theTextbox.value, true);
        if (errs.length == 0) errs = ['You want:'];
        if (theTextbox.value.trim() == '') errs = ['Quantity'];
        document.getElementById(theTextbox.name + '_label').innerHTML = errs.join(", ");
    }













