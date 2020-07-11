const { getWeather } = require('./getWeather');

exports.handler = async function (event) {
  return await getWeather(event);
};
