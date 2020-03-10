const mongoose = require('mongoose');
const moment = require('moment');
const momenttz = require('moment-timezone');

const userTimezone = momenttz.tz.guess();
const currentDateWithTimezone = moment.tz(moment().format(), userTimezone);

const weatherSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  created_by: { type: Date, default: currentDateWithTimezone },
  updated_by: { type: Date, default: currentDateWithTimezone },
});

const weatherModel = mongoose.model('Weather', weatherSchema);

module.exports = weatherModel;
