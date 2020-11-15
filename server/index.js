process.env.NODE_CONFIG_DIR = `${__dirname}/../config/`;

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const config = require('config');
const router = require('./routes');

const {
  host,
  username,
  password,
} = config.get('db');

const configPort = config.get('port');

mongoose.connect(`mongodb://${username}:${password}@${host}?retryWrites=false`,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
(err) => {
  if (err) return console.log(err);
  console.log('Connected to MongoDB');
});

const port = process.env.PORT || configPort || 3000;

const app = express()
  .use(cors())
  .use(morgan('dev'))
  .use(express.json())
  .use('/', router)
  .listen(port, () => console.log(`Server running at port ${port}`));
