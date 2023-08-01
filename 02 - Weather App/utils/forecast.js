const request = require("request");
const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e3d864520be4efcaba26fb44aad4815d&query=${lat},${lon}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { temperature, feelslike } = body.current;
      console.log(
        `It is currently ${temperature} degree our. It feels like ${feelslike} degress our`
      );
      callback(undefined, current);
    }
  });
};
module.exports = forecast;
