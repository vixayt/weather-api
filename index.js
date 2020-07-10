const axios = require('axios');
const {
  openWeatherMapApiKey,
  darkSkyWeatherForecastApiKey,
} = require('./envconfig');

exports.handler = async function (event) {
  console.log('event be:', event);
  let city;
  if (event['queryStringParameters'] !== null) {
    city = event['queryStringParameters'].city;
  } else if (event['pathParameters'] !== null) {
    city = event['pathParameters'].city;
  } else {
    city = 'Portland';
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
      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: city,
          currentTemperature: openWeatherResponse.data.main.temp,
          darkWeather: darkWeatherResponse.data,
        }),
      };
      console.log(response);
      return response;
    } catch (error) {
      console.log('Dark Sky error', error);
      return {
        statusCode: 404,
      };
    }
  } catch (error) {
    console.log('Open Weather error', error);
    return {
      statusCode: 404,
    };
  }
};
