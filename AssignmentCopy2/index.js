//Index.js
const top_title = document.querySelector('.jumbotron h1');
const bottom_title = document.querySelector('footer p');
let store_name = "Cool Shoe Store";


const main = document.querySelector('.product-container');

// Fetch product data from the server
fetch('/api/products')
  .then((response) => response.json())
  .then((products) => {
    products.forEach((product) => {
      // Create a product card element
      const productCard = document.createElement('div');
      productCard.className = 'product-card';

      // Populate the product card with product information
      productCard.innerHTML = `
        <h2>${product.name}</h2>
        <p>Price: $${product.price}</p>
        <img src="${product.image}" alt="${product.name}" />
        <p>Quantity: ${product.quantity}</p>
      `;

      // Append the product card to the product container
      main.appendChild(productCard);
    });
  })
  .catch((error) => {
    console.error(error);
  });
