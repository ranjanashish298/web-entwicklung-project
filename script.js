/*------------------------Store-------------------------*/
function initCart() {
    if(!localStorage.getItem('cart')) { //if cart hasn't already been initialized
        var cart = {};
        cart.products = [];
    
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    updateTotal();
}

function addToCart(e) {
    var li = e.parentElement;

    var newProduct = {};
    newProduct.name = li.getAttribute('data-name');
    newProduct.price = li.getAttribute('data-price');
    newProduct.size = e.children[1].value; //selected value from dropdown

    if (localStorage && localStorage.getItem('cart')) { //if localStorage available and cart initialized

        var cart = JSON.parse(localStorage.getItem('cart')); //get cart, add new Product, set cart
        cart.products.push(newProduct);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    updateTotal();
}

function collapse(e) {
    var content = e.nextElementSibling;
    if (content.style.display != "none") {
        content.style.display = "none";
    } else {
        content.style.display = "grid";
    }
}

function updateTotal() {
    if (localStorage && localStorage.getItem('cart')) {
        var cart = JSON.parse(localStorage.getItem('cart'));

        var index = 0;
        var totalCost = 0;
        while (index < cart.products.length) {
            totalCost += +cart.products[index].price;
            index++;
        }
    }
    document.getElementById("cart").innerHTML = "(" + totalCost.toFixed(2) + "€) Cart";
}

document.querySelector('form[class=item]').addEventListener('submit', function (event) {
    event.preventDefault(); //stop submit button from reloading page
});
/*------------------------------------------------------*/

/*--------------------------Cart------------------------*/
function loadCart() {
    var list = document.getElementById("cartList");
    if (localStorage && localStorage.getItem('cart')) { //if localStorage available and cart initialized

        var cart = JSON.parse(localStorage.getItem('cart'));

        let index = 0;
        var totalCost = 0;

        while (index < cart.products.length) { //add all saved items and their corresponding buttons
            var currentElem = cart.products[index];

            var li = document.createElement("li");
            li.innerText = currentElem.price + "€ " + currentElem.name + " " + currentElem.size;
            
            var button = document.createElement("button");
            button.innerHTML = "x";
            button.setAttribute('onclick', 'removeItem('+ index +')');

            list.appendChild(li);
            list.appendChild(button);

            totalCost += +currentElem.price;
            
            index++;
        }
        if (index > 0) {
            var total = document.createElement("li");
            total.innerHTML = "Total: " + totalCost.toFixed(2) + "€";
            list.appendChild(total);
        }
    } 
}

function removeItem(index) {
    var cart = JSON.parse(localStorage.getItem('cart'));

    cart.products.splice(index, 1);
    
    localStorage.setItem('cart', JSON.stringify(cart));

    location.reload();
}
/*------------------------------------------------------*/