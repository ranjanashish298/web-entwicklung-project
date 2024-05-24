/*------------------------Store-------------------------*/

function initCart() {
    if(!localStorage.getItem('cart')) { //if cart hasn't already been initialized
        var cart = {};
        cart.products = [];
    
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

function addToCart(e) {
    var li = e.parentElement;

    var newProduct = {};
    newProduct.name = li.getAttribute('data-name');
    newProduct.price = li.getAttribute('data-price');
    newProduct.size = e.children[0].value; //selected value from dropdown

    if (localStorage && localStorage.getItem('cart')) { //if localStorage available and cart initialized

        var cart = JSON.parse(localStorage.getItem('cart')); //get cart, add new Product, set cart
        cart.products.push(newProduct);
        localStorage.setItem('cart', JSON.stringify(cart));
    } 
}
/*------------------------------------------------------*/