const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const https = require("node:https");


app.listen(port, ()=>{
    console.log("Server is on ! Port : 3000");
});

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html"); 
});

app.post("/", (req, res)=>{
    var cityName = req.body.cityName
    
    const apikey = "#################";
    const query = cityName;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&APPID="+ apikey +"&units="+ unit;

    https.get(url, (response)=>{
        console.log(response.statusCode);

        response.on("data", (data)=>{
            const weatherData = JSON.parse(data);
            const weatherCityName = weatherData.name;
            const weatherTemp = weatherData.main.temp;

            const weatherDescription = weatherData.weather[0].description;
            
            const icon = weatherData.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in "+ weatherCityName +" is " + weatherTemp + " degrees Celcius.</h1>");
            res.write("<img src=" + iconURL + ">")
            res.send()

        });
    });

});


