const inventory = [
  {
    name: "blueshirt",
    price: 80,
    amount: 0,
  },
  {
    name: "whiteshirt",
    price: 60,
    amount: 0,
  },
  {
    name: "blackshirt",
    price: 60,
    amount: 0,
  },
  {
    name: "blazer",
    price: 100,
    amount: 0,
  },
];
//functions
//handle click buttons
function clickHandler({ target }) {
  if (target.classList.contains("add-btn")) {
    const itemName = target.id.slice(4);
    updateCartItems(itemName, inventory);
  } else if (target.classList.contains("plus-btn")) {
    const itemName = target.dataset.btn;
    updateCartItems(itemName, inventory);
  } else if (target.classList.contains("minus-btn")) {
    const itemName = target.dataset.btn;
    removeCartItems(itemName, inventory);
  }
}

function updateCartItems(name, inventory) {
  //update inventory object with new amounts
  inventory.forEach((item) => {
    if (item.name === name) {
      item.amount++;
    }
  });
  // If the item already exists in the cart, update its quantity
  const cartItems = Array.from(cartItemContainer.children);
  const existingItem = cartItems.find((item) => item.dataset.name === name);
  if (existingItem) {
    const quantityEl = existingItem.querySelector(".item-description.amount");
    const quantity = parseInt(quantityEl.textContent);
    quantityEl.textContent = quantity + 1;
  } else {
    // If the item is not in the cart, add it as a new item
    const item = inventory.find((item) => item.name === name);
    const html = `<div class="cart-item" data-name="${name}">
                   <span class="item-description name">${name}</span>
                   <span class="item-description amount">${item.amount}</span>
                   <span class="item-description price">${item.price}</span>
                   <button class="cart-btn plus-btn" data-btn="${name}">+</button>
                   <button class="cart-btn minus-btn" data-btn="${name}" >-</button>
                 </div>`;
    cartItemContainer.insertAdjacentHTML("afterbegin", html);
  }
  updateTotal(inventory);
}
//remove cart items
function removeCartItems(name, inventory) {
  inventory.forEach((item) => {
    if (item.name === name) {
      item.amount--;

      const existingItem = Array.from(cartItemContainer.children).find(
        (item) => item.dataset.name === name
      );
      const quantityEl = existingItem.querySelector(".item-description.amount");
      const quantity = parseInt(quantityEl.textContent);
      quantityEl.textContent = quantity - 1;
      //if current item is 0 or less than 0 remove from cart
      if (item.amount <= 0) {
        existingItem.remove();
      }
    }
  });
  updateTotal(inventory);
}
//update total amount
function updateTotal(items) {
  let newTotal = items.reduce((total, current) => {
    return total + current.price * current.amount;
  }, 0);
  cartTotal.textContent = `Total ${newTotal}`;
}
//functions

//get dom elements
const addButtons = document.getElementById("main-container");
const cartItemContainer = document.getElementById("cart-items-container");
let cartTotal = document.getElementById("cart-total");
cartTotal.textContent = `Total ${0}`;
//get dom elements

//add event listener to buttons
addButtons.addEventListener("click", clickHandler);
