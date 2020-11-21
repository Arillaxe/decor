const router = require("express").Router();
const { Review, Product } = require('../models');
const verifyToken = require('../lib/verifyToken');

router.get('/moderate', verifyToken, async (req, res) => {
  const reviews = await Review.find({ moderated: false });
  const toSend = [];

  for (let review of reviews) {
    const product = await Product.findById(review.productId);

    toSend.push({ ...review.toJSON(), product });
  }

  res.json({ reviews: toSend });
});

router.get('/:productId', async (req, res) => {
  const { productId } = req.params;

  if (!productId) return res.status(402).json({ error: 'Specify productId' });

  const reviews = await Review.find({ productId, moderated: true });

  res.json({ reviews });
});

router.post('/verify/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(402).json({ error: 'Specify id' });

  const review = await Review.findById(id);

  review.moderated = true;

  await review.save();

  res.sendStatus(200);
});

router.put('/:productId', async (req, res) => {
  const { author = '', body = '' } = req.body;
  const { productId } = req.params;

  if (!author.trim() || !body.trim()) return res.status(402).json({ error: 'Specify all required fields' });

  const product = await Product.findById(productId);

  if (!product) return res.status(404).json({ error: 'Product not found' });

  const review = await Review.create({ author, body, productId });

  res.json({ review });
});

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(402).json({ error: 'Specify id' });

  const review = await Review.findById(id);

  if (!review) return res.status(404).json({ error: 'Review not found' });

  await review.deleteOne();

  res.sendStatus(200);
});

module.exports = router;
