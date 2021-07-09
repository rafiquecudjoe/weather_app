const express = require("express");
const https = require("https");

const Router = express.Router();

Router.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

Router.post("/", function (req, res) {
  const { cityName } = req.body;
  const apiKey = "a9f331e6e6b43c2e9c0545475edfdaf8";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey +
    " ";
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const descrip = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        `<h1>The temperature in ${cityName} is ${temp} degrees Celcious</h1>`
      );
      res.write(`<p>The weather is currently ${descrip}</p>`);
      res.write("<img src=" + imageURL + ">");
      res.status(300).send();
    });
  });
});

module.exports = Router;
