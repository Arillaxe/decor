const router = require("express").Router();
const { HomeGrid, Product } = require('../models');
const verifyToken = require('../lib/verifyToken');

router.get('/', async (req, res) => {
  const homeGrids = await HomeGrid.find({});
  const homeGridsWithProducts = [];

  for (let homeGrid of homeGrids) {
    const products = await Product.find({ _id: homeGrid.products });

    homeGridsWithProducts.push({ ...homeGrid.toJSON(), products });
  }

  res.json({ homeGrids: homeGridsWithProducts });
});

router.put('/', verifyToken, async (req, res) => {
  const { title, products } = req.body;

  if (!title || !title.trim() || !products || !products.length) return res.status(402).json({ error: 'Specify all required fields' });
  if (!products.filter((productId) => productId.trim()).length) return res.status(402).json({ error: 'Specify all required fields' });

  for (let productId of products) {
    try {
      const product = await Product.findById(productId);

      if (!product) return res.status(402).json({ error: `Неверный ID: ${productId}` });
    } catch (e) {
      return res.status(402).json({ error: `Неверный ID: ${productId}` });
    }
  }

  const homeGrid = await HomeGrid.create({ title, products });

  res.json({ homeGrid });
});

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(402).json({ error: 'Specify id' });

  const homeGrid = await HomeGrid.findById(id);

  if (!homeGrid) return res.status(404).json({ error: 'HomeGrid not found' });

  await homeGrid.deleteOne();

  res.sendStatus(200);
});

module.exports = router;
