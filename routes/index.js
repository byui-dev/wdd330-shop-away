const express = require("express");
const router = express.Router();
const { fetchShopifyProducts } = require("../utils/shopifyApi");

router.get("/", (req, res) => {
  res.render("index", { title: "Shop Away", selectedCurrency: req.session.currency || "USD" });
});

router.get("/search", async (req, res) => {
  const query = req.query.q?.toLocaleLowerCase().trim();
  const allProducts = await fetchShopifyProducts({ limit: 250 });

  const results = query
  ? allProducts.filter(p => p.title.toLocaleLowerCase().includes(query) || p.body_html.toLocaleLowerCase().includes(query))
  : [];

  res.render("searchResults", { title: "Search Results", query, results, selectedCurrency: req.session.currency || "USD" });
});

router.post("/set-currency", (req, res) => {
  req.session.currency = req.body.currency;
  res.redirect("back");
});  

module.exports = router;
