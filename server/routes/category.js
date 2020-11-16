const router = require("express").Router();
const { Category } = require('../models');
const verifyToken = require('../lib/verifyToken');

router.get('/', async (req, res) => {
  const categories = await Category.find({});

  res.json({ categories });
});

router.put('/', verifyToken, async (req, res) => {
  const { name = '', title = '' } = req.body;

  if (!name.trim() || !title.trim()) return res.status(402).json({ error: 'Specify all required fields' });
  
  const existingCategory = await Category.findOne({ name });

  if (existingCategory) return res.status(400).json({ error: 'Такая категория уже существует' });

  const category = await Category.create({ name, title });

  res.json({ category });
});

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(402).json({ error: 'Specify id' });

  const category = await Category.findById(id);

  if (!category) return res.status(404).json({ error: 'Category not found' });

  await category.deleteOne();

  res.sendStatus(200);
});

module.exports = router;
