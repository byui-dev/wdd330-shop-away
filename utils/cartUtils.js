function getCart(req) {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  return req.session.cart;
}

function addToCart(req, product) {
  const cart = getCart(req);
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  req.session.cart = cart;
}

function removeFromCart(req, productId) {
  const cart = getCart(req);
  req.session.cart = cart.filter((item) => item.id !== productId);
}

function updateQuantity(req, productId, action) {
  const cart = getCart(req);
  const item = cart.find((i) => i.id === productId);
  if (item) {
    if (action === "increase") {
      item.quantity += 1;
    } else if (action === "decrease") {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        req.session.cart = cart.filter((i) => i.id !== productId);
        return;
      }
    }
  }
  req.session.cart = cart;
}

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
};
