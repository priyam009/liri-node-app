require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var logText = {};

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
  var concertUrl =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";

  axios
    .get(concertUrl)
    .then(function(response) {

      var jsonData = response.data;

      for (var i = 0; i < jsonData.length; i++) {
        var dateTime = jsonData[i].datetime.split("T");
        var date = moment(dateTime[i], "YYYY-MM-DD").format("MM/DD/YYYY");

        if (i < 3 && date !== "Invalid date") {
          console.log("\n-------------\n");

          console.log("artist", artist);
          console.log("Venue Name: " + jsonData[i].venue.name);
          console.log("Venue Location: " + jsonData[i].venue.country);
          console.log("Date: " + date);

          console.log("\n-------------\n");

          logText = [
            "Artist: " + artist,
            "Venue Name: " + jsonData[i].venue.name,
            "Venue Location: " + jsonData[i].venue.country,
            "Date: " + date
          ].join("\n");

          logData(logText);
          
        } else {
          break;
        }
      }

      if (response.data.length == 0) {
        console.log("\n" + "There are no concerts for this " + artist + "!" + "\n");

        logText = "There are no concerts for this " + artist + "!";
        logData(logText);
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
    .search({ type: "track", query: songName, limit: 1 })
    .then(function(response) {

      var jsonData = response.tracks;

      console.log("\n-------------\n");

      console.log("Artists: " + jsonData.items[0].artists[0].name);

      console.log("Song Name: " + jsonData.items[0].name);

      console.log(
        "Spotify Link: " +
        jsonData.items[0].artists[0].external_urls.spotify
      );

      console.log("Album: " + jsonData.items[0].album.name);

      console.log("\n-------------\n");

      logText = [
        "Artists: " + jsonData.items[0].artists[0].name,
        "Song Name: " + jsonData.items[0].name,
        "Album: " + jsonData.items[0].album.name
      ].join("\n");

      logData(logText);
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

      var jsonData = response.data;
      
      console.log("\n-------------\n");

      console.log("Movie Title: " + jsonData.Title);
      console.log("Movie Year: " + jsonData.Year);
      console.log("Imdb Rating: " + jsonData.imdbRating);
      console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);

      console.log("\n-------------\n");

      logText = [
        "Movie Title: " + jsonData.Title,
        "Movie Year: " + jsonData.Year,
        "Imdb Rating: " + jsonData.imdbRating,
        "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
        "Country: " + jsonData.Country,
        "Language: " + jsonData.Language,
        "Plot: " + jsonData.Plot,
        "Actors: " + jsonData.Actors
      ].join("\n");

      logData(logText);
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
        concert(name);
        break;
    }
  });
}

function logData(logText) {
  var divider = "\n--------------------------------\n";
  fs.appendFile("log.txt", logText + divider, function(
    err
  ) {
    if (err) {
      console.log(err);
    } else {
      console.log("Content Added!");
    }
  });
}
