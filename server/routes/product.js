const path = require('path');
const md5 = require('md5');
const config = require('config');
const router = require("express").Router();
const {
  HomeGrid,
  Product,
  Review,
} = require('../models');
const verifyToken = require('../lib/verifyToken');

const { host, proxyPort } = config;

router.get('/:id?', async (req, res) => {
  const { id } = req.params;

  const products = await Product.find(id ? { _id: id } : {}).sort({ createdAt: -1 });

  res.json({ products });
});

router.put('/', verifyToken, async (req, res) => {
  const requiredFields = [
    'title',
    'category',
    'description',
    'dimensions',
    'price',
  ];

  const requiredFiles = [
    'image',
    'bgImage',
  ];

  for (let field of requiredFields) {
    if (!req.body[field]) return res.status(402).json({ error: 'Specify all required fields' });
  }

  for (let field of requiredFiles) {
    if (!req.files[field]) return res.status(402).json({ error: 'Specify all required fields' });
  }

  const {
    title,
    category,
    description,
    dimensions,
    price,
  } = req.body;

  const fileNames = {};

  try {
    for (let fileField in req.files) {
      const file = req.files[fileField];
      const ext = file.name.split('.').pop();

      fileNames[fileField] = `${md5(file.name + Date.now())}.${ext}`;

      await file.mv(path.join(__dirname, `../public/images/${fileNames[fileField]}`));
    }
  } catch (e) {
    return res.status(502).json({ error: String(e) });
  }

  const publicImages = `${host}:${proxyPort}/images`;

  const images = Object.keys(fileNames)
    .filter((fieldName) => fieldName !== 'image' && fieldName !== 'bgImage')
    .map((fieldName) => `${publicImages}/${fileNames[fieldName]}`);

  const product = await Product.create({
    title,
    category,
    description,
    dimensions,
    price,
    imageURL: `${publicImages}/${fileNames['image']}`,
    bgImage: `${publicImages}/${fileNames['bgImage']}`,
    images,
  });

  res.json({ product });
});

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(402).json({ error: 'Specify id' });

  const product = await Product.findById(id);

  if (!product) return res.status(404).json({ error: 'Product not found' });

  await Review.deleteMany({ productId: id });
  const homeGrids = await HomeGrid.find({ products: id });

  for (let homeGrid of homeGrids) {
    homeGrid.products = homeGrid.products.filter((productId) => productId !== id);

    await homeGrid.save();
  }

  await product.deleteOne();

  res.sendStatus(200);
});

module.exports = router;
