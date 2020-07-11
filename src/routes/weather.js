const express = require('express');
const router = express.Router();

const weatherController = require('../controller/weather');

const { isUserLoggedIn } = require('../middleware/middleware');

router.get('/get-weather', isUserLoggedIn, weatherController.getWeather);

module.exports = router;
