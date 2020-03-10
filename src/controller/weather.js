const mongoose = require('mongoose');
const _ = require('lodash');
const axios = require('axios');

module.exports.getWeather = (req, res) => {
    res.status(200).json({
        message: 'getWeather'
    });
}
