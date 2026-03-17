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

    let imageCategory = "planets"; // default search term

    let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=" + imageCategory;

    let response = await fetch(url);
    let data = await response.json();

    let imageUrl = data.hits[randomIndex].webformatURL;

    res.render('home.ejs', { imageUrl });

});


app.get('/planetInfo', (req, res) => {
    let planet = req.query.planet;
    let planetInfo = planets[`get${planet}`]();
   res.render('planet.ejs', {planetInfo, planet}) // can only pass one object
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