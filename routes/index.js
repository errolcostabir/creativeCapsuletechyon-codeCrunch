var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

router.get('/',(req,res,next)=>{
  res.send('Welcome to the main page of REST API TASKS for CodeCrunch');
});

//Section 1 API Endpoints

//Search API endpoint for country

router.get('/country/search', (req, res, next) => {
  const searchText = req.query.searchText;

  if (Number.isInteger(searchText)) {
    var url = new URL("https://restcountries.eu/rest/v2/callingcode/" + searchText);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        res.send(
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
          });
      })
      .catch(err => {
        res.send(err);
      });
  }
  else if (searchText.length == 2 || searchText.length == 3) {
    var url = new URL("https://restcountries.eu/rest/v2/alpha/" + searchText);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        res.send(
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
          });
      })
      .catch(err => {
        res.send(err);
      });
  }
  else {
    const newText=searchText.charAt(0).toUpperCase()+searchText.substring(1,searchText.length);
    console.log(newText);
    const url = "https://restcountries.eu/rest/v2/all";
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        for (i = 0; i < data.length; i++) {
          if (data[i]['name'] == newText || data[i]['capital'] == newText) {
            res.send(
              {
                name: data[i]['name'],
                alpha2Code: data[i]['alpha2Code'],
                alpha3Code: data[i]['alpha3Code'],
                capital: data[i]['capital'],
                region: data[i]['region'],
                population: data[i]['population'],
                flag: data[i]['flag'],
                totalLanguages: data[i]['languages'].length,
                totalCurrencies: data[i]['currencies'].length,
              });
          }
        }
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
    .then(res => res.json())
    .then(data => {
      res.setHeader('Content-Type','Application/json');
      res.send(
        {
          name: data[0]['name'],
          alpha2Code: data[0]['alpha2Code'],
          alpha3Code: data[0]['alpha3Code'],
          capital: data[0]['capital'],
          region: data[0]['region'],
          population: data[0]['population'],
          flag: data[0]['flag'],
          totalLanguages: data[0]['languages'].length,
          totalCurrencies: data[0]['currencies'].length,
        });
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
    .then(res => res.json())
    .then(data => {
      res.send(
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
        });
    })
    .catch(err => {
      res.send(err);
    });
});


//Section 2 API Endpoint

//Covid Search API Endpoint for country name or Code

router.get('/covid/country/search',(req,res,next)=>{
  const searchText=req.query.searchText;
  console.log(searchText);
  if(searchText.length==2||searchText.length==3){
    var url=new URL('https://covid19-api.com/country/code?code='+searchText);
  }
  else{
    var url=new URL('https://covid19-api.com/country?name='+searchText);
  }
  console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(data => {
      res.send(
        {
          country: data[0]['country'],
          confirmed: data[0]['confirmed'],
          recovered: data[0]['recovered'],
          critical: data[0]['critical'],
          deaths: data[0]['deaths']
        });
    })
    .catch(err => {
      res.send(err);
    });
});


//covid Country name API Endpoint 

router.get('/covid/country/name/:country_name',(req,res,next)=>{
  const name=req.params.country_name;
  console.log(name);
  var url=new URL('https://covid19-api.com/country?name='+name);
  console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(data => {
      res.send(
        {
          country: data[0]['country'],
          confirmed: data[0]['confirmed'],
          recovered: data[0]['recovered'],
          critical: data[0]['critical'],
          deaths: data[0]['deaths']
        });
    })
    .catch(err => {
      res.send(err);
    });
});


//covid Country code API Endpoint

router.get('/covid/country/code/:country_code',(req,res,next)=>{
  const code=req.params.country_code;
  console.log(code);
  var url=new URL('https://covid19-api.com/country/code?code='+code);
  console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(data => {
      res.send(
        {
          country: data[0]['country'],
          confirmed: data[0]['confirmed'],
          recovered: data[0]['recovered'],
          critical: data[0]['critical'],
          deaths: data[0]['deaths']
        });
    })
    .catch(err => {
      res.send(err);
    });
});


module.exports = router;
