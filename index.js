import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://weatherapi-com.p.rapidapi.com/current.json";

app.set("view engine", "ejs")
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.post("/weather", async (req, res) => {
    const place = req.body["city"];
    try {
        const result =  await axios.get(API_URL ,{headers: {
            'X-RapidAPI-Key': '12f91c33e9msh17cc21c4e2c07efp19121ejsn1d316fdb3262',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
          },
          params: {q: `${place}`}});
        
      res.render("index.ejs", { city: result.data.location.name,
        country: result.data.location.country,
        time: result.data.location.localtime,
        temp: result.data.current.temp_c + " °C",
        humid: result.data.current.humidity + " %",
        icon: result.data.current.condition.icon,
        feelsLike: result.data.current.feelslike_c + " °C",
        windspeed: result.data.current.wind_kph + " km/h",
        precip: result.data.current.precip_mm + " mm",
        winddir: result.data.current.wind_dir,
        region: result.data.location.region
      });
    } catch (error) {
      res.render("index.ejs",{ error: "Please Try Again!!!"});
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });