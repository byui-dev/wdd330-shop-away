const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
} = require("../utils/cartUtils");
const { convertCurrency } = require("../utils/currency");

router.get("/", (req, res) => {
  const cart = getCart(req);
  res.render("cart", { cart, selectedCurrency: req.session.currency || "USD" });
});

router.post("/add", (req, res) => {
  addToCart(req, req.body.product);
  res.redirect("/cart");
});

router.post("/remove", (req, res) => {
  removeFromCart(req, req.body.productId);
  res.redirect("cart");
});

router.post("/update", (req, res) => {
  updateQuantity(req, req.body.productId, req.body.action);
  res.redirect("/cart");
});

router.get("/checkout", async (req, res) => {
  const cart = getCart(req);
  const totalUSD = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const currency = req.session.currency || "USD";
  const totalConverted = await convertCurrency(totalUSD, "USD", currency);
  res.render("checkout", { cart, totalUSD, totalConverted, currency, selectedCurrency: req.session.currency || "USD" });
});

module.exports = router;
