import express from 'express';
import fetch from "node-fetch";
import { getAsteroids, getComets } from 'npm-solarsystem';
const planets = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));




// routes
// root route
app.get('/', async (req, res) => {

    let randomIndex = Math.floor(Math.random() * 50);

    let imageCategory = "solar system"; // default search term

    let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=" + imageCategory;

    let response = await fetch(url);
    let data = await response.json();

    let imageUrl = data.hits[randomIndex].webformatURL;

    res.render('home.ejs', { imageUrl });

});


app.get('/planetInfo', (req, res) => {
    let planet = req.query.planet;
    let planetInfo = planets[`get${planet}`]();

    if (planet === 'Mars') {
        planetInfo.image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlhOxqoJHJmyTk-tmsMDN5KqSmLM-BG_rmeg&s';
    }
    if (planet === 'Jupiter') {
        planetInfo.image = 'https://static.scientificamerican.com/sciam/cache/file/03F4BD48-09E2-4268-84D73CFADF043A00_source.jpg?w=1200';
    }
    if (planet === 'Uranus') {
        planetInfo.image = 'https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/p/i/a/1/PIA18182-1.jpg?w=1720&h=1720&fit=clip&crop=faces%2Cfocalpoint';
    }

    res.render('planet.ejs', { planetInfo, planet });
});

app.get('/asteroid', (req, res) => {
    let asteroidInfo = getAsteroids();
   res.render('asteroid.ejs', {asteroidInfo})
});

app.get('/comet', (req, res) => {
    let cometInfo = getComets();
   res.render('comet.ejs', {cometInfo})
});

app.get('/nasa-pod', async (req, res) => {

   let apiKey = "WgIkuDMhLxVkMQY8UQQB7goLj2sZDEQeHwIKn7tV";

   let url = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;

   let response = await fetch(url);
   let data = await response.json();

   let imagePOD = data.url;

   res.render('nasa-pod.ejs', { imagePOD });

});

// mercury
// app.get('/mercury', (req, res) => {
//     let mercuryInfo = planets.getMercury();
//     console.log(mercuryInfo);
//    res.render('mercury.ejs', {mercuryInfo}) // can only pass one object
// });


app.listen(3000, () => {
   console.log('server started');
});