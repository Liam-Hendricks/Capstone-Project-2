const express = require("express");
const helmet = require('helmet')
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
//using node fetch
const fetch = require("node-fetch");
//using helmet for security
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setting port to env port or 3001
const PORT = process.env.PORT || 3001;

//GET request for movie search
app.get("/movie", function (req, responseServer) {
    fetch(`https://itunes.apple.com/search?term=${req.query.search}&entity=movie&limit=10`)
    .then((res)=>res.json())
    .then((response)=> responseServer.json({"data":response}))
    .catch((error) => responseServer.json({"data":error}));
 });
 //GET request for podcast search
 app.get("/podcast", function (req, responseServer) {
    fetch(`https://itunes.apple.com/search?term=${req.query.search}&entity=podcast&limit=10`)
    .then((res)=>res.json())
    .then((response)=> responseServer.json({"data":response}))
    .catch((error) => responseServer.json({"data":error}));
 });
 //GET request for music search
 app.get("/music", function (req, responseServer) {
    fetch(`https://itunes.apple.com/search?term=${req.query.search}&media=music&entity=song&limit=10`)
    .then((res)=>res.json())
    .then((response)=> responseServer.json({"data":response}))
    .catch((error) => responseServer.json({"data":error}));
 });
 //GET request for audiobook search
 app.get("/audiobook", function (req, responseServer) {
    fetch(`https://itunes.apple.com/search?term=${req.query.search}&media=audiobook&limit=10`)
    .then((res)=>res.json())
    .then((response)=> responseServer.json({"data":response}))
    .catch((error) => responseServer.json({"data":error}));
 });
 //GET request for shortfilm search
 app.get("/shortfilm", function (req, responseServer) {
    fetch(`https://itunes.apple.com/search?term=${req.query.search}&attribute=shortFilmTerm&limit=10`)
    .then((res)=>res.json())
    .then((response)=> responseServer.json({"data":response}))
    .catch((error) => responseServer.json({"data":error}));
 });
 //GET request for tvshow search
 app.get("/tvshow", function (req, responseServer) {
    fetch(`https://itunes.apple.com/search?term=${req.query.search}&media=tvShow&entity=tvEpisode&attribute=tvSeasonTerm&limit=10`)
    .then((res)=>res.json())
    .then((response)=> responseServer.json({"data":response}))
    .catch((error) => responseServer.json({"data":error}));
 });
 //GET request for software search
 app.get("/software", function (req, responseServer) {
    fetch(`https://itunes.apple.com/search?term=${req.query.search}&entity=software&limit=10`)
    .then((res)=>res.json())
    .then((response)=> responseServer.json({"data":response}))
    .catch((error) => responseServer.json({"data":error}));
 });
 //GET request for ebook search
 app.get("/ebook", function (req, responseServer) {
    fetch(`https://itunes.apple.com/search?term=${req.query.search}&entity=ebook&limit=10`)
    .then((res)=>res.json())
    .then((response)=> responseServer.json({"data":response}))
    .catch((error) => responseServer.json({"data":error}));
 });
 //GET request for all search
 app.get("/all", function (req, responseServer) {
    fetch(`https://itunes.apple.com/search?term=${req.query.search}&limit=10`)
    .then((res)=>res.json())
    .then((response)=> responseServer.json({"data":response}))
    .catch((error) => responseServer.json({"data":error}));
 });
   //pointing to the resources express will need in a production enviroment
  if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'library-app/build')));
   
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname+'/library-app/build/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(
      `Server is listening on port ${PORT}. Open http://localhost:${PORT}`
    );
  });