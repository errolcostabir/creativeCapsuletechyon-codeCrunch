const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

// Get Weather By City Name
const APIkey = "63025ff9dd4f06c7a0f5a6b3d480beb9";
const Err404 = {
  status: "404",
  message: "weather data not found",
};

router.get("/city/:cityName", (req, res, next) => {
  const cityName = req.params.cityName;
  const cityURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIkey;

  fetch(cityURL)
    .then((res) => res.json())
    .then((data) => {
      res.setHeader('Content-Type','Application/json');
      res.send(
        JSON.stringify(
        {
        country: data["sys"]["country"],
        name: data["name"],
        temp: data["main"]["temp"],
        min_temp: data["main"]["temp_min"],
        max_temp: data["main"]["temp_max"],
        latitude: data["coord"]["lat"],
        longitude: data["coord"]["lon"],
      },undefined,4));
    })
    .catch((err) => {
      res.send(Err404);
    });
});

//Get Weather By Latitude-Longitude or pinCode
router.get("/search", (req, res, next) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const pinCode = req.query.pin_code;

  console.log(latitude);
  console.log(longitude);
  console.log(pinCode);

  if (pinCode == undefined) {
    if (latitude != undefined && longitude != undefined) {
      const latLongURL =
        "http://api.openweathermap.org/data/2.5/weather?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        APIkey;

      fetch(latLongURL)
        .then((res) => res.json())
        .then((data) => {
          res.setHeader('Content-Type','Application/json');
          res.send(
            JSON.stringify(
            {
            country: data["sys"]["country"],
            name: data["name"],
            temp: data["main"]["temp"],
            min_temp: data["main"]["temp_min"],
            max_temp: data["main"]["temp_max"],
            latitude: data["coord"]["lat"],
            longitude: data["coord"]["lon"],
          },undefined,4));
        })
        .catch((err) => {
          console.log("Error in fetch");
          res.send(Err404);
        });
    } else {
      res.send(Err404);
    }
  } else {
    const pinCodeURL =
      "http://api.openweathermap.org/data/2.5/weather?zip=" +
      pinCode +
      ",in&appid=" +
      APIkey;

    fetch(pinCodeURL)
      .then((res) => res.json())
      .then((data) => {
        res.setHeader('Content-Type','Application/json');
        res.send(
          JSON.stringify(
          {
          country: data["sys"]["country"],
          name: data["name"],
          temp: data["main"]["temp"],
          min_temp: data["main"]["temp_min"],
          max_temp: data["main"]["temp_max"],
          latitude: data["coord"]["lat"],
          longitude: data["coord"]["lon"],
        },undefined,2));
      })
      .catch((err) => {
        res.send(Err404);
      });
  }
});

module.exports = router;
