const mongoose = require('mongoose');
const moment = require('moment');
const momenttz = require('moment-timezone');

const userTimezone = momenttz.tz.guess();
const currentDateWithTimezone = moment.tz(moment().format(), userTimezone);

const weatherSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  coord: { type: mongoose.Schema.Types.Mixed },
  weather: { type: [mongoose.Schema.Types.Mixed] },
  base: { type: [String] },
  main: { type: mongoose.Schema.Types.Mixed },
  visibility: { type: Number },
  wind: { type: mongoose.Schema.Types.Mixed },
  clouds: { type: mongoose.Schema.Types.Mixed },
  dt: { type: Number },
  sys: { type: mongoose.Schema.Types.Mixed },
  timezone: { type: Number },
  id: { type: Number },
  name: { type: String },
  cod: { type: Number },
  created_by: { type: Date, default: currentDateWithTimezone },
  updated_by: { type: Date, default: currentDateWithTimezone },
});

const weatherModel = mongoose.model('Weather', weatherSchema);

module.exports = weatherModel;
