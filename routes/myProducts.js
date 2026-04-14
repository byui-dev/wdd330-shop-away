const express = require('express');
const router = express.Router();
const { fetchShopifyProducts } = require('../utils/shopifyApi');
const { convertCurrency, getCurrencySymbol } = require('../utils/currency');

router.get('/', async (req, res) => {
  const tag = req.query.tag;
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  const selectedCurrency = req.session.currency || 'USD';
  const currencySymbol = getCurrencySymbol(selectedCurrency);

  try {
    const products = await fetchShopifyProducts({ page, limit });

    const filtered = tag
      ? products.filter(p => p.tags?.split(',').map(t => t.trim()).includes(tag))
      : products;

    const totalPages = Math.ceil(filtered.length / limit);
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    // Convert prices to selected currency
    const productsWithConvertedPrices = await Promise.all(paginated.map(async (product) => {
      const rawPrice = product.variants[0]?.price;
      const convertedPrice = await convertCurrency(parseFloat(rawPrice), 'USD', selectedCurrency);
      return {
        ...product,
        convertedPrice: convertedPrice.toFixed(2),
      };
    }));
    
      res.render('myProducts', {
      products: productsWithConvertedPrices,
      selectedTag: tag,
      currentPage: page,
      totalPages,
      selectedCurrency: selectedCurrency,
      currencySymbol: currencySymbol,
    });
  } catch (err) {
    console.error('Error loading Shopify products:', err);
    res.status(500).send('Failed to load products');
  }
});

module.exports = router;
