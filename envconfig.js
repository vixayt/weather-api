const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  openWeatherMapApiKey: process.env.OPENWEATHERMAP_APIKEY,
  darkSkyWeatherForecastApiKey: process.env.DARKSKYWEATHERFORECAST_APIKEY,
  trimetApiKey: process.env.TRIMET_APIKEY,
  port: process.env.PORT
};
