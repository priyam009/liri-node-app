require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

console.log(spotify);

var infoType = process.argv[2];
var name = process.argv[3] ? process.argv.slice(3).join(" ") : null;

switch (infoType) {
  case "concert-this":
    concert(name);
    break;

  case "spotify-this-song":
    song(name);
    break;

  case "movie-this":
    movie(name);
    break;

  case "do-what-it-says":
    doit();
    break;
}

function concert(artist) {
  console.log("artist", artist);
  var concertUrl =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";

  axios
    .get(concertUrl)
    .then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        var dateTime = response.data[i].datetime.split("T");
        var date = moment(dateTime[i], "YYYY-MM-DD").format("MM/DD/YYYY");

        if (i < 3 && date !== "Invalid date") {
          console.log("\n" + "Venue Name: " + response.data[i].venue.name);
          console.log("Venue Location: " + response.data[i].venue.country);

          console.log("Date: " + date + "\n");
          console.log("----------------");
        } else {
          break;
        }
      }

      if (response.data.length == 0) {
        console.log("\n" + "There are no concerts for this artist!" + "\n");
      }
    })
    .catch(function(error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error.message);
      }
      console.log(error.config);
    });
}

function song(songName) {
  if (songName === null) {
    songName = "The Sign Ace of Base";
  }

  spotify
  .search({ type: 'track', query: songName, limit: 1})
  .then(function(response) {

    console.log("Artists: " + response.tracks.items[0].artists[0].name);

    console.log("Song Name: " + response.tracks.items[0].name);

    console.log("Spotify Link: " + response.tracks.items[0].artists[0].external_urls.spotify);

    console.log("Album: " + response.tracks.items[0].album.name);

  })
  .catch(function(err) {
    console.log(err);
  });
}

function movie(movieName) {
  if (movieName === null) {
    movieName = "Mr. Nobody";
  }

  var movieUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieName;

  axios
    .get(movieUrl)
    .then(function(response) {
      console.log("\n");
      console.log("Movie Title: " + response.data.Title);
      console.log("Movie Year: " + response.data.Year);
      console.log("Imdb Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      console.log("\n");
    })
    .catch(function(error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error.message);
      }
      console.log(error.config);
    });
}

function doit() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      console.log(error);
    }

    var data = data.split(",");
    var infoType = data[0];
    var name = data[1].split('"');
    name = name[1];

    switch (infoType) {
      case "spotify-this-song":
        song(name);
        break;

      case "movie-this":
        movie(name);
        break;

      case "concert-this":
        console.log(name);
        concert(name);
        break;
    }
  });
}

