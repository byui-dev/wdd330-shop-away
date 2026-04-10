const express = require('express');
const router = express.Router();
const { fetchShopifyProducts } = require('../utils/shopifyApi');

router.get('/', async (req, res) => {
  const tag = req.query.tag;
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  try {
    const products = await fetchShopifyProducts({ page, limit });

    const filtered = tag
      ? products.filter(p => p.tags?.split(',').map(t => t.trim()).includes(tag))
      : products;

    const totalPages = Math.ceil(filtered.length / limit);
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    res.render('myProducts', {
      products: paginated,
      selectedTag: tag,
      currentPage: page,
      totalPages
    });
  } catch (err) {
    console.error('Error loading Shopify products:', err);
    res.status(500).send('Failed to load products');
  }
});

module.exports = router;
