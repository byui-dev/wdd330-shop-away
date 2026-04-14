const express = require("express");
const router = express.Router();
const { fetchShopifyProductById } = require("../utils/shopifyApi");
const { convertCurrency, getCurrencySymbol } = require("../utils/currency");

router.get("/product/:id", async (req, res) => {
    const product = await fetchShopifyProductById(req.params.id);
  
    if (!product) {
        return res.status(404).send("Product not found");
    }

    const selectedCurrency = req.session.currency || "USD";
    const currencySymbol = getCurrencySymbol(selectedCurrency);
    const rawPrice = product.variants[0]?.price;
    const convertedPrice = await convertCurrency(parseFloat(rawPrice), "USD", selectedCurrency);

    res.render("productDetail", { product, selectedCurrency, currencySymbol, convertedPrice: convertedPrice.toFixed(2) });
});

module.exports = router;