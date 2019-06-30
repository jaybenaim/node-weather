const request = require('request'); 
const argv = require('yargs').argv; 
const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
// const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost/node-weather", { useNewUrlParser: true , useFindAndModify: false});

app.set('view engine', 'ejs'); 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

//INDEX 
app.get('/', function(req, res) { 
    res.render('index');
}); 

// POST - Submit 
app.post('/', function(req, res) { 
    let apiKey = "6bae4d140e256a1e6502400acdadb4ab"; 
    let city = req.body.city //argv.c  || 'Toronto'; // node app.js -c boston // -c flag adds variable 
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // API REQUEST 
request(url, function(err, response, body) { 
    if(err){ 
        res.render('index', {weather: null, error: 'Error, please try again'});
    } else { 
        let weather = JSON.parse(body); 
        if(weather.main == undefined){
            res.render('index', {weather: null, error: 'Error, please try again'});
          } else {
            let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
            res.render('index', {weather: weatherText, error: null});
          }
    }
});
}); 

app.listen(3000, function(){ 
    console.log("Servers up!"); 
})