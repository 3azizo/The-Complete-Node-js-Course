const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

let [, , address] = process.argv;

console.log(address);

if (address) {
  geocode(address, (error, { lat, lon, address, country } = {}) => {
    if (error) return console.log(error);

    forecast(lat, lon, (error, forecastData) => {
      if (error) return console.log(error);

      console.log(lat, lon);
      console.log(forecastData);
    });
  });
} else {
  console.log("Enter your loction");
}
