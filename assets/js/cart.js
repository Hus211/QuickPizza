let cart = JSON.parse(localStorage.getItem('cartData')) || []; // Get cart data from localStorage or initialize it as an empty array

// Function to update the cart count
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.innerText = cart.length; // Set the cart count in the navbar
}

// Function to show the cart popup
function showPopup() {
  const cartPopup = document.getElementById('cart-popup');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartTotal = document.getElementById('cart-total');
  console.log('Cart data from localStorage:', cart);

  // Clear previous items and add new ones
  cartItemsList.innerHTML = '';
  if (cart.length === 0) {
    cartItemsList.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.innerHTML = "Total: €0.00";
  } else {
    let total = 0;
    cart.forEach((item, index) => {
     console.log('Item:', item);
      console.log('Image Path:', item.image); // Debug the image path
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">€${item.price}</span>
        <button class="remove-item-btn" data-index="${index}">Remove</button>
      `;
      cartItemsList.appendChild(itemElement);
      
      // Update the total price
      total += parseFloat(item.price); // Add item price to the total
    });

    // Update the total price element
    cartTotal.innerHTML = `Total: €${total.toFixed(2)}`;
  }

  // Ensure the popup is centered and displayed correctly
  cartPopup.style.display = 'flex'; // Show the popup centered in the viewport
}

// Function to close the cart popup
function closePopup() {
  const cartPopup = document.getElementById('cart-popup');
  cartPopup.style.display = 'none'; // Hide the popup
}

// Function to add a pizza to the cart
function addToCart(pizzaName, pizzaPrice, pizzaImage) {
  console.log('Adding to cart:', pizzaName, pizzaPrice, pizzaImage); // Debugging line
  cart.push({ name: pizzaName, price: pizzaPrice, image: pizzaImage });
  updateCartCount();
  saveCartToLocalStorage(); // Save cart to localStorage whenever it is updated
}

// Function to remove an item from the cart
function removeItemFromCart(index) {
  // Remove the item from the cart array
  cart.splice(index, 1);
  updateCartCount();
  saveCartToLocalStorage(); // Save cart to localStorage after removal
  showPopup(); // Re-render the cart popup to reflect changes
}

// Function to save the cart data to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cartData', JSON.stringify(cart)); // Convert cart array to string and store it
}

// Set up event listeners for each pizza's add-to-cart button
const addButtons = document.querySelectorAll('.products__button');
addButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const pizzaCard = e.target.closest('.products__card');
    const pizzaName = pizzaCard.querySelector('.products__name')?.innerText;
    const pizzaPrice = parseFloat(pizzaCard.querySelector('.products__price')?.innerText.replace('€', '').trim());
    const pizzaImage = pizzaCard.querySelector('.products__img')?.src; // Grab the pizza image src

    addToCart(pizzaName, pizzaPrice, pizzaImage);
  });
});

// Event listener for the "View Cart" button
const viewCartButton = document.getElementById('view-cart-btn');
if (viewCartButton) {
  viewCartButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    showPopup(); // Show the cart popup when clicked
  });
}

// Event listener for closing the cart popup
const closePopupBtn = document.getElementById('close-cart-popup');
if (closePopupBtn) {
  closePopupBtn.addEventListener('click', closePopup);
}

// Event delegation for remove buttons in cart (dynamic content)
const cartItemsList = document.getElementById('cart-items-list');
if (cartItemsList) {
  cartItemsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item-btn')) {
      const itemIndex = e.target.getAttribute('data-index');
      removeItemFromCart(itemIndex);
    }
  });
}

// Add event listener to the Checkout button
const checkoutButton = document.getElementById('checkout-btn');
if (checkoutButton) {
  checkoutButton.addEventListener('click', function() {
    // Store the cart data in localStorage for checkout page
    localStorage.setItem('cartData', JSON.stringify(cart)); // Convert cart array to string and store it
    window.location.href = 'checkout.html'; // Redirect to the checkout page
  });
}

// Load the cart count on page load (if the page was refreshed)
document.addEventListener('DOMContentLoaded', updateCartCount);
