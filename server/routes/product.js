const router = require("express").Router();
const { Product } = require('../models');
const verifyToken = require('../lib/verifyToken');

router.get('/', async (req, res) => {
  const products = await Product.find({});

  res.json({ products });
});

router.put('/', verifyToken, async (req, res) => {
  const requiredFields = [
    'title',
    'category',
    'description',
    'dimensions',
    'price',
    'imageURL',
    'bgImage',
  ];

  for (let field of requiredFields) {
    if (!req.body[field]) return res.status(402).json({ error: 'Specify all required fields' });
  }

  const {
    title,
    category,
    description,
    dimensions,
    price,
    imageURL,
    bgImage,
    images,
  } = req.body;

  const product = await Product.create({
    title,
    category,
    description,
    dimensions,
    price,
    imageURL,
    bgImage,
    images,
  });

  res.json({ product });
});

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(402).json({ error: 'Specify id' });

  const product = await Product.findById(id);

  if (!product) return res.status(404).json({ error: 'Product not found' });

  await product.deleteOne();

  res.sendStatus(200);
});

module.exports = router;
