//products_display.js
const top_title = document.querySelector('.jumbotron h1');
const bottom_title = document.querySelector('footer p');
let store_name = "Cool Shoe Store";

//Cart Buttons
let cartBtn = document.querySelector('.cart-btn');
let closeCartBtn = document.querySelector('.close-cart');
let clearCartBtn = document.querySelector('.clear-cart');
let cartDOM = document.querySelector('.cart');
let cartOverlay = document.querySelector('.cart-overlay');
let cartItems = document.querySelector('.cart-items');
let cartTotal = document.querySelector('.cart-total');

let productsDOM = document.querySelector('.products-center');


//cart
let cart = []


//Retreiving products data
class Products{
async getProducts(){
    try {
        let result = await fetch('../products.json')
        let data = await result.json();

        let products = data.items;
        products = products.map(item => {
            const {title,price} = item.fields;
            const {id} = item.sys;
            const image = item.fields.image.fields.file.url;
            return {title,price,id,image}
        })
        return products
    }catch (error){
        console.log(error);
    }
}
}

//Display products
class UI {
}

//Local Storage
class Storage {

}

document.addEventListener("DOMContentLoaded",()=>{
    const products = new Products();
    const ui = new UI();

//get all products
products.getProducts().then(data => console.log(data));
});



