// Cart Elements
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Open Cart
cartIcon.onclick = function() {
  cart.classList.add("active");
};

// Close Cart
closeCart.onclick = function() {
  cart.classList.remove("active");
};

// Cart Working JS
document.addEventListener("DOMContentLoaded", function() {
  console.log('DOM fully loaded and parsed');
  ready();
});

// Initialize Cart Functionality
function ready() {
  // Remove Items From Cart
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  // Quantity Changes
  var quantityInputs = document.getElementsByClassName('cart-quantity');
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  // Add to Cart
  var addCartButtons = document.getElementsByClassName('add-cart');
  for (var i = 0; i < addCartButtons.length; i++) {
    var button = addCartButtons[i];
    button.addEventListener("click", addCartClicked);
  }

  // Buy Button Work
  var buyButton = document.getElementsByClassName('btn-buy')[0];
  if (buyButton) {
    buyButton.addEventListener('click', buyButtonClicked);
  } else {
    console.log('Buy button not found');
  }
}

// Buy Button
function buyButtonClicked() {
  console.log('Buy button clicked');
  alert('Your order is placed');
  var cartContent = document.getElementsByClassName('cart-content')[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal(); // Ensure total is updated after clearing cart
}

// Remove Items From Cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

// Quantity Changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// Add To Cart
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  var price = shopProducts.getElementsByClassName('price')[0].innerText;
  var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
  addProductToCart(title, price, productImg);
}

// Add Product To Cart
function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');
  
  var cartItems = document.getElementsByClassName('cart-content')[0];
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText === title) {
      alert('You have already added this item to the cart');
      return;
    }
  }

  var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <i class='bx bxs-trash-alt cart-remove'></i>
  `;
  
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);

  // Add event listeners for the new items
  cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
  cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

  updateTotal();
}

// Update Total Price
function updateTotal() {
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartBoxes = cartContent.getElementsByClassName('cart-box');
  var total = 0;

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName('cart-price')[0];
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];

    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total += (price * quantity);
  }

  // Round to 2 decimal places
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('total-price')[0].innerText = '$' + total.toFixed(2);
}
