let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart function
function addToCart(product, price) {
  // Check if product already in cart
  let existing = cart.find(item => item.product === product);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product + " added to cart!");
}

// Display Cart function
function displayCart() {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let cartList = document.getElementById("cart-items");
  let totalPrice = document.getElementById("cart-total");

  if (!cartList || !totalPrice) return; // Run only on cart.html

  cartList.innerHTML = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    let row = document.createElement("tr");

    // Product
    let nameCell = document.createElement("td");
    nameCell.textContent = item.product;
    row.appendChild(nameCell);

    // Price
    let priceCell = document.createElement("td");
    priceCell.textContent = `৳${item.price.toFixed(2)}`;
    row.appendChild(priceCell);

    // Quantity
    let qtyCell = document.createElement("td");
    let qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.value = item.quantity;
    qtyInput.min = 1;
    qtyInput.addEventListener("change", function () {
      cart[index].quantity = parseInt(qtyInput.value);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    });
    qtyCell.appendChild(qtyInput);
    row.appendChild(qtyCell);

    // Subtotal
    let subtotal = item.price * item.quantity;
    let subtotalCell = document.createElement("td");
    subtotalCell.textContent = `৳${subtotal.toFixed(2)}`;
    row.appendChild(subtotalCell);

    // Remove button
    let removeCell = document.createElement("td");
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function () {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    });
    removeCell.appendChild(removeBtn);
    row.appendChild(removeCell);

    cartList.appendChild(row);
    total += subtotal;
  });

  totalPrice.textContent = total.toFixed(2);
}

// Run displayCart only on cart.html
if (window.location.pathname.includes("cart.html")) {
  displayCart();
}
