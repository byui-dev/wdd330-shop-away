const express = require("express");
const router = express.Router();
const { fetchShopifyProducts } = require("../utils/shopifyApi");
const { convertCurrency, getCurrencySymbol } = require("../utils/currency");

router.get("/", (req, res) => {
  res.render("index", { title: "Shop Away", selectedCurrency: req.session.currency || "USD" });
});

router.get("/search", async (req, res) => {
  const query = req.query.q?.toLocaleLowerCase().trim();
  const allProducts = await fetchShopifyProducts({ limit: 250 });

  const filtered = query
    ? allProducts.filter(
        (p) =>
          p.title.toLocaleLowerCase().includes(query) ||
          p.body_html.toLocaleLowerCase().includes(query),
      )
    : [];

  const selectedCurrency = req.session.currency || "USD";
  const currencySymbol = getCurrencySymbol(selectedCurrency);

  const results = await Promise.all(
    filtered.map(async (product) => {
      const rawPrice = product.variants[0]?.price;
      const convertedPrice = await convertCurrency(
        parseFloat(rawPrice),
        "USD",
        selectedCurrency,
      );
      return {
        ...product,
        convertedPrice: convertedPrice.toFixed(2),
      };
    }),
  );

  res.render("searchResults", {
    title: "Search Results",
    query,
    results,
    selectedCurrency,
    currencySymbol,
  });
});  
  

router.get("/api/search", async (req, res) => {
  const query = req.query.q?.toLocaleLowerCase().trim();
  const allProducts = await fetchShopifyProducts({ limit: 250 });

  const filtered = query
  ? allProducts.filter(p => p.title.toLocaleLowerCase().includes(query) || p.body_html.toLocaleLowerCase().includes(query))
  : [];

  const selectedCurrency = req.session.currency || "USD";
  const currencySymbol = getCurrencySymbol(selectedCurrency);
  
  const results = await Promise.all(filtered.map(async (product) => {
    const rawPrice = product.variants[0]?.price;
    const convertedPrice = await convertCurrency(parseFloat(rawPrice), "USD", selectedCurrency);
    return {
      ...product,
      convertedPrice: convertedPrice.toFixed(2),
    };
  }));

  res.json(results);
});

router.post("/set-currency", (req, res) => {
  req.session.currency = req.body.currency;
  res.redirect("back");
});  

module.exports = router;
