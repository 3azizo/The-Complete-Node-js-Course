const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
//define paths for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "3azizo",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", name: "3azizo" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "3azizo",
    helpMassage: "something help full",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: " you must provide a address term",
    });
  }
  //fecth data
  geocode(req.query.address, (error, { lat, lon, address, country } = {}) => {
    if (error) return res.send({ error });
    forecast(lat, lon, (error, forecastData) => {
      if (error) return res.send({ error });
      return res.send(forecastData);
    });
  });
});

app.get("/products", (req, res) => {
  let query = req.query;
  console.log(query);

  if (!query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "3azizo",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "3azizo",
    message: "My 404 page, Not Found",
  });
});

app.listen(3000, (error) => {
  console.log("server running in part 3000");
});
