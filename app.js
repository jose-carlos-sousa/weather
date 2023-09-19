const express= require("express");
const app=express();
const https= require("https");
const bodyParser = require("body-parser"); 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser middleware
app.get("/",(req,res) => {
  
    res.sendFile(__dirname+"/index.html");
 
})
app.post("/", (req, res) => {
  const https = require("https");
  console.log(req);
  const query = req.body.cityname;
  const apiKey = "3427584519b5ce4fbb08eda86777aa15";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=metric";

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      console.log(weatherData);

      const temp = weatherData.main.temp;
      console.log(temp);

      const discr = weatherData.weather[0].description;
      console.log(discr);

      // Define imagePath using the icon from weatherData
      const icon = weatherData.weather[0].icon;
      const imagePath = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      let myHtml1 =
        "The temperature in " + query + " is " + temp + " degrees Celsius";
      let myHtml2 = "It is " + discr;

      // Set the content type to HTML and include Bootstrap styles
      res.setHeader("Content-Type", "text/html");
      res.write(`
        <!DOCTYPE html>
        <html>
        <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body class="container d-flex" >

          <div class="p-5 mx-auto mt-5" style="background-color: white !important">
            <h1 class="h1" >${myHtml1}</h1>
            <h3 class="h3">${myHtml2}</h3>
            <img src="${imagePath}" class=" mx-auto img-fluid">
          </div>
        </body>
        </html>
      `);

      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("server is running in 3000")
})