const mongoose = require('mongoose');
const _ = require('lodash');
const axios = require('axios');

const env = require('dotenv');
env.config();

const common = require('../common/common');
const Weather = require('../model/weather');

module.exports.getWeather = async (req, res) => {
  const cityName = req.query.cityName;

  const userLoginStatus = common.checkUserLogin(req, res);
  if (userLoginStatus) {
    const result = await getWeather(cityName);
    if (!_.isEmpty(result)) {
      const resultId = result.data.id;
      const weatherFromDB = await getWeatherFromDBById(resultId);
      if (_.isEmpty(weatherFromDB)) {
        await addWeatherToDB(result.data);
        res.status(200).json({
          message: 'getWeather success',
          result: result.data,
        });
      } else {
        res.status(200).json({
          message: 'getWeather success',
          result: weatherFromDB,
        });
      }
    } else {
      res.status(200).json({
        message: 'getWeather success',
        result: [],
      });
    }
  }
};

module.exports.getWeatherForTest = async cityName => {
  const result = await getWeather(cityName);
  return result;
};

async function getWeatherFromDBById(id) {
  const weather = await Weather.findOne({ id: id });
  return weather;
}

async function addWeatherToDB(data) {
  const weather = Weather({
    _id: mongoose.Types.ObjectId(),
    coord: data.coord,
    weather: data.weather,
    base: data.base,
    main: data.main,
    visibility: data.visibility,
    wind: data.wind,
    clouds: data.clouds,
    dt: data.dt,
    sys: data.sys,
    timezone: data.timezone,
    id: data.id,
    name: data.name,
    cod: data.cod,
  });

  const result = await weather.save();
  return result;
}

async function getWeather(cityName) {
  const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
    params: {
      q: cityName,
      appid: process.env.OPEN_WEATHER_API_KEY,
    },
    headers: {
      'Content-type': 'application/json',
    },
  });

  return result;
}
