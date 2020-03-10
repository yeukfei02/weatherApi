const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const mongoose = require('mongoose');

const env = require('dotenv');
env.config();

const userRoutes = require('./routes/user');
const weatherRoutes = require('./routes/weather');

const environment = app.get('env');
if (environment === 'development') {
  // mongo local db
  mongoose.connect('mongodb://localhost:27017/weather', { useNewUrlParser: true, useUnifiedTopology: true });
} else {
  // mongo atlas
  mongoose.connect(
    `mongodb+srv://yeukfei02:${process.env.MONGO_ATLAS_PASSWORD}@lunch-picker-goksl.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  );

  // docker local mongodb
  // mongoose.connect('mongodb://mongo:27017/lunch-picker', { useNewUrlParser: true, useUnifiedTopology: true });
}

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

app.use('/api/user', userRoutes);
app.use('/api/weather', weatherRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
});

module.exports = app;
