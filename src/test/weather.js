const weatherController = require('../controller/weather');

module.exports.getWeather = async cityName => {
  const result = await weatherController.getWeatherForTest(cityName);
  return result;
};
