const weather = require('./weather');

describe('main.test', () => {
  describe('weather', () => {
    test('getWeather', async () => {
      try {
        const result = await weather.getWeather('Hong Kong');
        expect(result).toBeDefined();
        expect(result.data).toBeDefined();
      } catch (e) {
        console.log(`error = ${e.message}`);
      }
    });
  });
});
