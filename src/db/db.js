const mongoose = require('mongoose');

module.exports.connectDB = async app => {
  const environment = app.get('env');
  if (environment === 'development') {
    // mongo local db
    mongoose.connect('mongodb://localhost:27017/weather', { useNewUrlParser: true, useUnifiedTopology: true });
  } else {
    // mongo atlas
    // mongoose.connect(
    //   `mongodb+srv://yeukfei02:${process.env.MONGO_ATLAS_PASSWORD}@weatherapi-ux8fn.mongodb.net/test?retryWrites=true&w=majority`,
    //   { useNewUrlParser: true, useUnifiedTopology: true },
    // );

    // docker local mongodb
    mongoose.connect('mongodb://mongo:27017/weather', { useNewUrlParser: true, useUnifiedTopology: true });
  }
};
