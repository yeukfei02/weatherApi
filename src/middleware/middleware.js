const _ = require('lodash');
const jwt = require('jsonwebtoken');

module.exports.isUserLoggedIn = (req, res, next) => {
  const token = !_.isEmpty(req.headers.authorization) ? req.headers.authorization.substring(7).trim() : '';

  if (!_.isEmpty(token)) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!_.isEmpty(decoded)) {
        next();
      }
    } catch (e) {
      res.status(400).json({
        message: `isUserLoggedIn error, error = ${e.message}`,
      });
    }
  } else {
    res.status(400).json({
      message: 'isUserLoggedIn error, please add bearer token',
    });
  }
};
