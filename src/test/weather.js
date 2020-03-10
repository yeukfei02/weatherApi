const axios = require('axios');

const env = require('dotenv');
env.config();

module.exports.getWeatherForTest = async (cityName) => {
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
