const path = require('path');
const md5 = require('md5');
const config = require('config');
const router = require("express").Router();
const { Gallery } = require('../models');
const verifyToken = require('../lib/verifyToken');

const { host, proxyPort } = config;

router.get('/', async (req, res) => {
  const galleries = await Gallery.find({}).sort({ createdAt: -1 });

  res.json({ galleries });
});

router.put('/', verifyToken, async (req, res) => {
  if (!Object.keys(req.files).length) return res.status(402).json({ error: 'Specify all required fields' });

  const publicImages = `${host}:${proxyPort}/images`;

  try {
    for (let imageField in req.files) {
      const image = req.files[imageField];
      const ext = image.name.split('.').pop();
      const fileName = `${md5(image.name + Date.now())}.${ext}`;
  
      await image.mv(path.join(__dirname, `../public/images/${fileName}`));
  
      await Gallery.create({ image: `${publicImages}/${fileName}` });
    }
    
    const galleries = await Gallery.find({}).sort({ createdAt: -1 });

    res.json({ galleries });
  } catch (e) {
    return res.status(502).json({ error: String(e) });
  }
});

router.delete('/all', verifyToken, async (req, res) => {
  await Gallery.deleteMany({});

  res.sendStatus(200);
});

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(402).json({ error: 'Specify id' });

  const gallery = await Gallery.findById(id);

  if (!gallery) return res.status(404).json({ error: 'Gallery not found' });

  await gallery.deleteOne();

  res.sendStatus(200);
});

module.exports = router;
