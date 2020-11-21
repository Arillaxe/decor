const router = require('express').Router();
const categoryRouter = require('./category');
const homeGridRouter = require('./homeGrid');
const galleryRouter = require('./gallery');
const loginRouter = require('./login');
const orderRouter = require('./order');
const productRouter = require('./product');
const reviewRouter = require('./review');

router.use('/category', categoryRouter);
router.use('/homeGrid', homeGridRouter);
router.use('/gallery', galleryRouter);
router.use(loginRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);
router.use('/review', reviewRouter);

module.exports = router;
