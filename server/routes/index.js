const router = require('express').Router();
const categoryRouter = require('./category');
const loginRouter = require('./login');
const productRouter = require('./product');

router.use('/category', categoryRouter);
router.use(loginRouter);
router.use('/product', productRouter);

module.exports = router;
