const express = require("express");
const path = require("path");
const hbs = require("hbs");

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
    helpMassage: "help me to get a job",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    location: "cairo",
    lon: 78.156,
    lat: 112,
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
