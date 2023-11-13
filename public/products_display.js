//products_display.js


const productForm = document.getElementById('productForm');

/*
productForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(productForm);

    fetch('/process_form', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Assuming data contains the URL for the invoice page
        let { invoiceUrl, quantities} = data;
        let urlWithQuantities = `${invoiceUrl}?${quantities.map=$((qty, i) => `qty${i}=${qty}`).join('&')}`;
        window.location.href = data.invoiceUrl;
    })
    .catch(error => console.error('Error submitting the form:', error));
});
*/

// declare and push to the DOM the store name at top and bottom
let store_name = "Cool Shoe Store";
top_title.innerHTML = store_name;
// send store name information to the footer title
bottom_title.innerHTML = "Wear History. It's cool.";

let productDisplayContainer = document.getElementById('product-display-container');


// Function to generate table rows and apply quantity validation
for (let i = 0; i < products.length; i++) {
  const productDiv = document.createElement('div');
  productDiv.classList.add('product-item'); // Add a class to the product item

  productDiv.innerHTML = `
        <h2>${products[i]["name"]}  \$${products[i]["price"]}</h2>
        <p style="color: black;">Quantity: <span class="quantity">${products[i]["qty_available"]}</span></p>
        <img src="${products[i]["image"]}" style="width:350px; height: auto;"/>
        <input type="text" class="quantity-input" name="quantity_textbox${i}" value="0" min="0" data-max="${products[i]["qty_available"]}"/>
        <span class="quantity-message" id="quantity_textbox_${i}_message">Enter a quantity</span>
    `;

  productDisplayContainer.appendChild(productDiv);
  };

// Add an event listener to each quantity input for real-time validation
document.querySelectorAll('.quantity-input').forEach((input, i) => {
  input.addEventListener('input', function () {
      const quantityMessage = document.getElementById(`quantity_textbox_${i}_message`);
      const qty = Number(this.value);
      const validationMessage = validateQuantity(qty, products[i]["qty_available"]);

      // Update error message dynamically
      quantityMessage.textContent = validationMessage;
  });
});



// Event listener for form submission
document.getElementById('productForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

 // Fetch the form action attribute (the URL to redirect to)
 const actionUrl = this.action;

 // Use fetch API to handle the form submission and redirect
 fetch(actionUrl, {
     method: 'POST',
     body: new FormData(this),
 })
 .then(response => response.text())
 .then(invoiceContent => {
     // Redirect to the invoice page with the receipt parameter
     window.location.href = `invoice.html?receipt=${encodeURIComponent(invoiceContent)}`;
 })
 .catch(error => console.error('Error submitting the form:', error));
});


  
// Function to validate quantity
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


//autoplay music
function playAudio() {
  var audio = document.getElementById("background-music");
  audio.play();
}