const axios = require('axios');
const {
  openWeatherMapApiKey,
  darkSkyWeatherForecastApiKey,
} = require('./envconfig');

const response = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
  },
  body,
});

exports.getWeather = async function (event) {
  console.log('event be:', event);
  let city;
  if (event['queryStringParameters'] !== null) {
    city = event['queryStringParameters'].city;
  } else if (event['pathParameters'] !== null) {
    city = event['pathParameters'].city;
  } else {
    city = 'portland';
  }
  console.log('City be: ', city);
  try {
    const openWeatherResponse = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${openWeatherMapApiKey}`
    );
    try {
      const darkWeatherResponse = await axios.get(
        `https://api.darksky.net/forecast/${darkSkyWeatherForecastApiKey}/${openWeatherResponse.data.coord.lat},${openWeatherResponse.data.coord.lon}`
      );
      return response(
        200,
        JSON.stringify({
          city: city,
          currentTemperature: openWeatherResponse.data.main.temp,
          darkWeather: darkWeatherResponse.data,
        })
      );
    } catch (error) {
      return response(
        404,
        JSON.stringify({
          message: 'Dark Sky Error',
          error: error,
        })
      );
    }
  } catch (error) {
    return response(
      404,
      JSON.stringify({
        message: 'Open Weather Error',
        error: error,
      })
    );
  }
};
