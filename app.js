const express = require('express')
const {response} = require('express')
const https = require('https');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+ "/index.html");
})
app.post('/',(req,res)=>{
  //  console.log("The request is received")
 //  console.log(req.body.cityName);
   const query =req.body.cityName
    const apiKey='886705b4c1182eb1c69f28eb8c520e20'
    const url ='https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apiKey+''
    https.get(url,(response)=>{
//console.log(response.statusCode)
response.on('data',(data)=>{
    //console.log(data);
    const weatherData = JSON.parse(data);
    //console.log(weatherData)
    const temp = weatherData.main.temp;
    const  description = weatherData.weather[0].description
    console.log( description)
    res.write("<h1></h1>The temperature in "+query+" is "+ temp+" degree celcius</h1>")
         res.write("<p>The weather description is "+description+"</p>")
       //  res.end()
})
    })
  // res.send("This is for checking our server")
})
app.listen(3001,()=>console.log("our sevrer is running at port 3001"))
