const mongoose = require('mongoose');
const _ = require('lodash');
const axios = require('axios');

module.exports.signup = (req, res) => {
    res.status(201).json({
        message: 'signup'
    });
}

module.exports.login = (req, res) => {
    res.status(201).json({
        message: 'login'
    });
}
