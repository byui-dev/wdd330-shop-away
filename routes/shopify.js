const express = require("express");
const router = express.Router();
const { fetchShopifyProductById } = require("../utils/shopifyApi");

router.get("/product/:id", async (req, res) => {
    const product = await fetchShopifyProductById(req.params.id);
  
    if (!product) {
        return res.status(404).send("Product not found");
    }

    res.render("productDetail", { product });
});

module.exports = router;