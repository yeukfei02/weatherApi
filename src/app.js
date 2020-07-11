const express = require('express');

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

const env = require('dotenv');
env.config();

const app = express();
const port = process.env.PORT || 3000;

const { connectDB } = require('./db/db');

const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');
const weatherRoutes = require('./routes/weather');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

connectDB(app);

app.use('/', mainRoutes);
app.use('/api/user', userRoutes);
app.use('/api/weather', weatherRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});
