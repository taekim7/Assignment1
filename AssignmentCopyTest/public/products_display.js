//products_display.js


// Add an event listener to ensure the DOM is fully loaded before running the script
/*document.addEventListener('DOMContentLoaded', function () {
  // Fetch product data from the server
  fetch('/products.js')
    .then(response => response.json())
    .then(data => {
      // Your code to display the products goes here
      let products = data;
      for (let i = 0; i < products.length; i++) {
        document.querySelector('.main').innerHTML += `
          <section class="item" onmouseover="changeClassName(this);" onclick="resetClassName(this);">
            <h2>${products[i].name}</h2>
            <p>$${products[i].price}</p>
            <img src="${products[i].image}" />
          </section>`;
      }
    });
});
*/
//declare and push to the DOM the store name at top and bottom
const store_name="Cool Shoe Store";
top_title.innerHTML=(store_name);
//send store name infor to the footer title
bottom_title.innerHTML=("Wear History. It's cool.");

//Product information
let products = [
  {
    "name": "Jordan 1 OG BRED",
    "image": "./images/bred1.webp",
    "price": 400.0,
    "qty_available": 10
  },
  {
    "name": "Jordan 4 White Cement",
    "image": "./images/cement4.jpg",
    "price": 350.0,
    "qty_available": 10
  },
  {
    "name": "Jordan 5 UNC",
    "image": "./images/unc5.jpg",
    "price": 300.0,
    "qty_available": 10
  },
  {
    "name": "Jordan 6 Infrared",
    "image": "./images/infrared6.webp",
    "price": 240.0,
    "qty_available": 10
  },
  {
    "name": "Jordan 11 Concord",
    "image": "./images/concord11.webp",
    "price": 280.0,
    "qty_available": 10
  },
  {
    "name": "Jordan 12 Flu Game",
    "image": "./images/flugame12.jpg",
    "price": 320.0,
    "qty_available": 10
  }
];

//Creating a loop to display product data to html
for (i = 0; i < products.length; i++){
    document.querySelector('.main').innerHTML += `
    <section class="item" onmouseover="changeClassName(this);"
    onclick="resetClassName(this);">
        <h2>${products[i].name}</h2>
        <p>$${products [i].price}</p>
        <img src="${products [i].image}" />
        <p>Quantity: ${products[i].qty_available}</p>
        <label for="qty_available${i}">Quantity Available:</label>
        <span id="remaining${i}">${products[i].qty_available}</span>
        <label for="qty_textbox">Quantity Desired:</label>
        <input type="text" name="qty_textbox">
        <span id="qty_textbox_message">Enter a quantity</span>
    
    </section>`;
}

//Purchase Form
const purchaseForm = document.getElementById('productForm');
const quantityInput = document.getElementById('quantityInput');
const priceInput = document.getElementById('priceInput');

purchaseForm.addEventListener('submit', function (event) {
    const selectedProduct = document.querySelector('.item.selected');
    if (selectedProduct) {
        const price = selectedProduct.dataset.price;
        priceInput.value = price;
    }
});


// Update remaining quantity
function updateRemainingQuantity(index, quantityInput) {
  const remainingQuantitySpan = document.getElementById(`remaining${index}`);
  const quantityInputValue = parseInt(quantityInput.value, 10);
  if (!isNaN(quantityInputValue)) {
    const remainingQuantity = products[index].qty_available - quantityInputValue;
    remainingQuantitySpan.textContent = `Remaining Quantity: ${remainingQuantity}`;
  }
}

// Add an event listener to the input fields to call the updateRemainingQuantity function
for (let i = 0; i < products.length; i++) {
  const quantityInput = document.querySelector(`input[name=qty_available${i}]`);
  quantityInput.addEventListener('input', function () {
    updateRemainingQuantity(i, this);
  });
}
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
}











