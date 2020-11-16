const router = require("express").Router();
const { Order, Product } = require('../models');
const verifyToken = require('../lib/verifyToken');

router.get('/', verifyToken, async (req, res) => {
  const orders = await Order.find({});
  const ordersWithProducts = [];

  for (let order of orders) {
    const aggregatedProducts = order.products.reduce((aggregated, productId) => {
      const existing = aggregated.find(({ product: aggregatedId }) => String(aggregatedId) === String(productId));

      if (existing) {
        existing.amount++;
      } else {
        aggregated.push({ amount: 1, product: productId });
      }
  
      return aggregated;
    }, []);

    for (let aggregated of aggregatedProducts) {
      const product = await Product.findById(aggregated.product);

      aggregated.product = product;
    }

    ordersWithProducts.push({ ...order.toJSON(), products: aggregatedProducts });
  }

  res.json({ orders: ordersWithProducts });
});

router.put('/', async (req, res) => {
  const requiredFields = [
    'name',
    'phone',
    'address',
    'products',
  ];

  for (let field of requiredFields) {
    if (!req.body[field]) return res.status(402).json({ error: 'Specify all required fields' });
  }

  const {
    name,
    email,
    phone,
    address,
    comment,
    products,
  } = req.body;

  const order = await Order.create({
    name,
    email,
    phone,
    address,
    comment,
    products,
  });

  res.json({ order });
});

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(402).json({ error: 'Specify id' });

  const order = await Order.findById(id);

  if (!order) return res.status(404).json({ error: 'Order not found' });

  await order.deleteOne();

  res.sendStatus(200);
});

module.exports = router;
