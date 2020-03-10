const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

module.exports.signup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!_.isEmpty(email) && !_.isEmpty(password)) {
    const user = await User.findOne({ email: email });
    if (_.isEmpty(user)) {
      const user = User({
        _id: mongoose.Types.ObjectId(),
        email: email,
        password: bcrypt.hashSync(password, 10),
      });

      const result = await user.save();
      if (!_.isEmpty(result)) {
        res.status(201).json({
          message: 'signup success',
        });
      } else {
        res.status(400).json({
          message: 'signup error',
        });
      }
    } else {
      res.status(400).json({
        message: 'signup error, email already exists',
      });
    }
  }
};

module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!_.isEmpty(email) && !_.isEmpty(password)) {
    const user = await User.findOne({ email: email });
    if (!_.isEmpty(user)) {
      const userPasswordFromDB = user.password;
      if (bcrypt.compareSync(password, userPasswordFromDB)) {
        const token = jwt.sign(
          {
            email: email,
            password: password,
          },
          process.env.JWT_SECRET,
        );

        res.status(201).json({
          message: 'login success',
          token: token,
        });
      } else {
        res.status(400).json({
          message: 'login error, password is not correct',
        });
      }
    } else {
      res.status(400).json({
        message: 'login error, cannot find user by email',
      });
    }
  }
};
