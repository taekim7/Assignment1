//SERVER.JS
let express = require('express');
let products = require("./products.json");

let app = express();
app.use(express.static(__dirname + '/public'));

app.post("/process_invoice", function (request, response, next) {
    let POST = request.body;
    if(typeof POST['purchase_submit'] == 'undefined') {
        console.log('No purchase form data');
        next();
    } 

    console.log(Date.now() + ': Purchase made from ip ' + request.ip + ' data: ' + JSON.stringify(POST));

    let contents = fs.readFileSync('./views/invoice.template', 'utf8');
    response.send(eval('`' + contents + '`')); // render template string

function display_invoice_table_rows() {
    let subtotal = 0;
    let str = '';
    
    for (let i = 0; i < products.length; i++) {
        let a_qty = POST[`quantity${i}`] || 0;
        
        if (a_qty > 0) {
            // product row
            let extended_price = a_qty * products[i].price;
            subtotal += extended_price;
            
            str += `
  <tr>
    <td width="43%">${products[i].name}</td>
    <td align="center" width="11%">${a_qty}</td>
    <td width="13%">\$${products[i].price}</td>
    <td width="54%">\$${extended_price}</td>
  </tr>
  `;
        }
    }
    
    let tax_rate = 0.04;
    let tax = tax_rate * subtotal;

    let shipping = 0;
    if (subtotal <= 300) {
        shipping = 10;
    } else if (subtotal <= 200) {
        shipping = 20;
    } else {
        shipping = 0.04 * subtotal; // 4% of subtotal
    }

    let total = subtotal + tax + shipping;
    
    return str;
}

});

app.get("/products", function (request, response) {
    response.json(products);//
    let productHTML = display_products(); //Call the function to generate HTML
    contents = contents.replace("<-- Product_Content -->", productHTML); //insert product HTML into the HTML
    response.send(eval('`' + contents + '`')); // render template string
});
    function display_products() {
        let productHTML = '';
        for (let i = 0; i < products.length; i++) {
            productHTML += `
                <section class="item">
                    <h2>${products[i].brand}</h2>
                    <p>$${products[i].price}</p>
                    <label id="quantity${i}_label"}">Quantity</label>
                    <input type="text" placeholder="0" name="quantity${i}" 
                    onkeyup="checkQuantityTextbox(this);">
                    <span id="remaining${i}">Remaining Quantity: ${products[i].availableQuantity}</span>
                    <img src="${products[i].image}">
                </section>
            `;
        }
        return productHTML;
    }

//Call Display Products to generate to HTML
let productHTML = display_products();


app.listen(8080, () => console.log(`listening on port 8080`));