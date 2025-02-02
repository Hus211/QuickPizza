document.addEventListener('DOMContentLoaded', () => {
  // Retrieve cart data from localStorage
  const cartData = JSON.parse(localStorage.getItem('cartData')) || [];

  // Elements to display cart items and total price
  const orderItemsList = document.getElementById('order-items-list');
  const totalPriceElement = document.getElementById('total-price');

  if (cartData.length > 0) {
    let total = 0;

    // Loop through the cart items and display them
    cartData.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('order-item');

      // Create a div to hold the image, name, price, and a break line for formatting
      li.innerHTML = `
        <div class="order-item-details">
          <img src="${item.image}" alt="${item.name}" class="order-item-image" />
          <div class="order-item-text">
        <img src="${item.image}" alt="${item.name}" class="order-item-image" />
            <span class="order-item-name">${item.name}</span> - 
            <span class="order-item-price">€${item.price}</span>
          </div>

        </div>
      `;

      orderItemsList.appendChild(li);

      // Add the item price to the total
      total += parseFloat(item.price); // Ensure the price is parsed correctly
    });

    // Update the total price element
    totalPriceElement.innerText = `Total: €${total.toFixed(2)}`;
  } else {
    // If no items in the cart, show a message
    orderItemsList.innerHTML = "<li>Your cart is empty.</li>";
    totalPriceElement.innerText = "Total: €0.00";
  }

  // Handle form submission (placing the order)
  const checkoutForm = document.getElementById('checkout-form');

  checkoutForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get user details from the form
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment').value;

    // Basic form validation
    if (!name || !address || !paymentMethod) {
      alert('Please fill in all fields.');
      return;
    }

    // Create the order object
    const order = {
      name: name,
      address: address,
      paymentMethod: paymentMethod,
      cart: cartData,
      totalAmount: totalPriceElement.innerText
    };

    // Log the order (this could be an API call to submit the order to the server)
    console.log('Order placed:', order);

    // Optionally, clear the cart from localStorage
    localStorage.removeItem('cartData');

    // Redirect to a confirmation page (you can create a confirmation page)
    window.location.href = 'order-confirmation.html'; // Redirect to an order confirmation page
  });
});
