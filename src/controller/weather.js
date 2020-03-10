const mongoose = require('mongoose');
const _ = require('lodash');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const Weather = require('../model/weather');

module.exports.getWeather = async (req, res) => {
  const cityName = req.query.cityName;
  const token = !_.isEmpty(req.headers.authorization) ? req.headers.authorization.substring(7).trim() : '';

  if (!_.isEmpty(token)) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!_.isEmpty(decoded)) {
        const result = await getWeather(cityName, token);
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
    } catch (e) {
      res.status(400).json({
        message: `getWeather error, error = ${e.message}`,
      });
    }
  } else {
    res.status(400).json({
      message: 'getWeather error, please add bearer token',
    });
  }
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
