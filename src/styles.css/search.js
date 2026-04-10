router.get('/', async (req, res) => {
  const query = req.query.q?.toLowerCase() || '';

  try {
    const products = await fetchShopifyProducts({ limit: 250 });

    const matched = products.filter(p => {
      const titleMatch = p.title?.toLowerCase().includes(query);
      const tagMatch = p.tags?.split(',').map(t => t.trim().toLowerCase()).some(tag => tag.includes(query));
      return titleMatch || tagMatch;
    });

    res.json(matched); // Send JSON instead of rendering EJS
  } catch (err) {
    console.error('Shopify search error:', err.message);
    res.status(500).json({ error: 'Search failed' });
  }
});
