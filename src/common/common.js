const _ = require('lodash');
const jwt = require('jsonwebtoken');

module.exports.checkUserLogin = (req, res) => {
  let result = false;

  const token = !_.isEmpty(req.headers.authorization) ? req.headers.authorization.substring(7).trim() : '';

  if (!_.isEmpty(token)) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!_.isEmpty(decoded)) {
        result = true;
      }
    } catch (e) {
      res.status(400).json({
        message: `checkUserLogin error, error = ${e.message}`,
      });
    }
  } else {
    res.status(400).json({
      message: 'checkUserLogin error, please add bearer token',
    });
  }

  return result;
};
