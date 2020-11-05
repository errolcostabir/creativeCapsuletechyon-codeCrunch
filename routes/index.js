var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

//Section 1 API Endpoints

//Search API endpoint for country

router.get('/country/search', (req, res, next) => {
  const searchText = req.query.searchText;

  if (Number.isInteger(searchText)) {
    var url = new URL("https://restcountries.eu/rest/v2/callingcode/" + searchText);
    fetch(url)
      .then((res) => {
        if (res.status === 404 || res.status === 200) {
          return res.json();
        }
      })
      .then(data => {
        if (data.status == 404) {
          res.sendStatus(404);
        }
        else {
          res.setHeader('Content-Type', 'Application/json');
          res.send(
            JSON.stringify(
              {
                name: data['name'],
                alpha2Code: data['alpha2Code'],
                alpha3Code: data['alpha3Code'],
                capital: data['capital'],
                region: data['region'],
                population: data['population'],
                flag: data['flag'],
                totalLanguages: data['languages'].length,
                totalCurrencies: data['currencies'].length,
              }, undefined, 2));
        }
      }, (err) => {
        res.send(err);
      })
      .catch(err => {
        res.send(err);
      });
  }
  else if (searchText.length == 2 || searchText.length == 3) {
    var url = new URL("https://restcountries.eu/rest/v2/alpha/" + searchText);
    fetch(url)
      .then(res => {
        if (res.status === 404 || res.status === 200) {
          return res.json();
        }
      })
      .then(data => {
        if (data.status === 404) {
          res.sendStatus(404);
        }
        else {
          res.setHeader('Content-Type', 'Application/json');
          res.send(
            JSON.stringify(
              {
                name: data['name'],
                alpha2Code: data['alpha2Code'],
                alpha3Code: data['alpha3Code'],
                capital: data['capital'],
                region: data['region'],
                population: data['population'],
                flag: data['flag'],
                totalLanguages: data['languages'].length,
                totalCurrencies: data['currencies'].length,
              }, undefined, 2));
        }
      }, (err) => {
        res.send(err);
      })
      .catch(err => {
        res.send(err);
      });
  }
  else {
    const newText = searchText.charAt(0).toUpperCase() + searchText.substring(1, searchText.length);
    console.log(newText);
    const url = "https://restcountries.eu/rest/v2/all";
    fetch(url)
      .then(res => {
        if (res.status === 404 || res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        if (data.status === 404) {
          res.sendStatus(404);
        }
        else {
          res.setHeader('Content-Type', 'Application/json');
          var flag = 0;
          var index;
          for (i = 0; i < data.length; i++) {
            if (data[i]['name'] == newText || data[i]['capital'] == newText) {
              flag = 1;
              index = i;
              break;
            }
          }
          if (flag == 1) {
            res.send(
              JSON.stringify(
                {
                  name: data[index]['name'],
                  alpha2Code: data[index]['alpha2Code'],
                  alpha3Code: data[index]['alpha3Code'],
                  capital: data[index]['capital'],
                  region: data[index]['region'],
                  population: data[index]['population'],
                  flag: data[index]['flag'],
                  totalLanguages: data[index]['languages'].length,
                  totalCurrencies: data[index]['currencies'].length,
                }, undefined, 2));
          }
          else {
            res.sendStatus(404);
          }
        }
      }, (err) => {
        res.send(err);
      })
      .catch(err => {
        res.send(err);
      });
  }
});

//Country Name API Endpoint

router.get('/country/name/:country_name', (req, res, next) => {
  const name = req.params.country_name;
  var url = new URL("https://restcountries.eu/rest/v2/name/" + name + "?fullText=true");
  fetch(url)
    .then((res) => {
      console.log(res.status);
      if (res.status === 404 || res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data.status);
      if (data.status === 404) {
        //console.log(data.status, data.message);
        res.sendStatus(404);
      }
      else {
        // console.log('Success');
        res.setHeader('Content-Type', 'Application/json');
        res.send(
          JSON.stringify({
            name: data[0]['name'],
            alpha2Code: data[0]['alpha2Code'],
            alpha3Code: data[0]['alpha3Code'],
            capital: data[0]['capital'],
            region: data[0]['region'],
            population: data[0]['population'],
            flag: data[0]['flag'],
            totalLanguages: data[0]['languages'].length,
            totalCurrencies: data[0]['currencies'].length,
          }, undefined, 2)
        );
      }
    }, (err) => {
      res.send(err);
    })
    .catch(err => {
      res.send(err);
    });
});

//Country Code API Endpoint

router.get('/country/code/:country_code', (req, res, next) => {

  const code = req.params.country_code;

  if (code.length == 2) {
    var url = new URL("https://restcountries.eu/rest/v2/alpha/" + code);
  }
  else {
    var url = new URL("https://restcountries.eu/rest/v2/alpha/" + code);
  }
  fetch(url)
    .then(res => {
      //console.log(res.status);
      if (res.status === 404 || res.status === 200) {
        return res.json();
      }
    })
    .then(data => {
      //console.log(data.status);
      if (data.status === 404) {
        res.sendStatus(404);
      }
      else {
        res.setHeader('Content-Type', 'Application/json');
        res.send(
          JSON.stringify(
            {
              name: data['name'],
              alpha2Code: data['alpha2Code'],
              alpha3Code: data['alpha3Code'],
              capital: data['capital'],
              region: data['region'],
              population: data['population'],
              flag: data['flag'],
              totalLanguages: data['languages'].length,
              totalCurrencies: data['currencies'].length,
            }, undefined, 20));
      }
    }, (err) => {
      res.send(err);
    })
    .catch(err => {
      res.send(err);
    });
});


//Section 2 API Endpoint

//Covid Search API Endpoint for country name or Code

router.get('/covid/country/search', (req, res, next) => {
  const searchText = req.query.searchText;
  console.log(searchText);
  if (searchText.length == 2 || searchText.length == 3) {
    var url = new URL('https://covid19-api.com/country/code?code=' + searchText);
  }
  else {
    var url = new URL('https://covid19-api.com/country?name=' + searchText);
  }
  console.log(url);
  fetch(url)
    .then((res) => {
      if (res.status === 404 || res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      if (data.status === 404 || data.length===0) {
        res.sendStatus(404);
      }
      else {
        res.setHeader('Content-Type', 'Application/json');
        res.send(
          JSON.stringify(
            {
              country: data[0]['country'],
              confirmed: data[0]['confirmed'],
              recovered: data[0]['recovered'],
              critical: data[0]['critical'],
              deaths: data[0]['deaths']
            }, undefined, 2));
      }
    }, (err) => {
      res.send(err);
    })
    .catch(err => {
      res.send(err);
    });
});


//covid Country name API Endpoint 

router.get('/covid/country/name/:country_name', (req, res, next) => {
  const name = req.params.country_name;
  //console.log(name);
  var url = new URL('https://covid19-api.com/country?name=' + name);
  //console.log(url);
  fetch(url)
    .then((res) => {
      if (res.status === 404 || res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data.length);
      if (data.status === 404 || data.length===0) {
        res.sendStatus(404);
      }

      else {
        res.setHeader('Content-Type', 'Application/json');
        res.send(
          JSON.stringify(
            {
              country: data[0]['country'],
              confirmed: data[0]['confirmed'],
              recovered: data[0]['recovered'],
              critical: data[0]['critical'],
              deaths: data[0]['deaths']
            }, undefined, 2));
      }
    }, (err) => {
      res.send(err);
    })
    .catch(err => {
      res.send(err.Number);
    });
});


//covid Country code API Endpoint

router.get('/covid/country/code/:country_code', (req, res, next) => {
  const code = req.params.country_code;
  console.log(code);
  var url = new URL('https://covid19-api.com/country/code?code=' + code);
  console.log(url);
  fetch(url)
    .then(res => {
      if (res.status === 404 || res.status === 200) {
        return res.json();
      }
    })
    .then(data => {
      console.log(data.length);
      if (data.status === 404 || data.length===0) {
        res.sendStatus(404);
      }
      else {
        res.setHeader('Content-Type', 'Application/json');
        res.send(
          JSON.stringify(
            {
              country: data[0]['country'],
              confirmed: data[0]['confirmed'],
              recovered: data[0]['recovered'],
              critical: data[0]['critical'],
              deaths: data[0]['deaths']
            }, undefined, 2));
      }

    }, (err) => {
      res.send(err);
    })
    .catch(err => {
      res.send(err);
    });
});


module.exports = router;
