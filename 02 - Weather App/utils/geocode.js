const request = require("request");
const geocode = (address, callback) => {
  const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    address
  )}&limit=1&appid=dcac24b89f839c8931b0a7f7ef9cf124`;
  request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error || response.body[0].lat == undefined) {
      callback("Unable to find location", undefined);
    } else {
      let { lat, lon, country } = response.body[0];
      callback(undefined, { lat, lon, address, country });
    }
  });
};
module.exports = geocode;
