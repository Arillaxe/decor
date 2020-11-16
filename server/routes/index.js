const router = require('express').Router();
const categoryRouter = require('./category');
const homeGridRouter = require('./homeGrid');
const loginRouter = require('./login');
const orderRouter = require('./order');
const productRouter = require('./product');

router.use('/category', categoryRouter);
router.use('/homeGrid', homeGridRouter);
router.use(loginRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);

module.exports = router;
