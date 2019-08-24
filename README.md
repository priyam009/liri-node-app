# liri-node-app

## 1. Problem Statement

**Liri-node-app** is a command line app that takes specific arguments from the user, contacts Spotify, omdb and bands in town api and sends required information back to the user.

This will give the user information about the a song or a movie or a concert event for artist/band.

## 2. Organisation

* **liri.js-** Contains all the code and api calls.

* **package.json-** Contains all the dependences 
(mentioned in Technologies secion below)

* **keys.js-** Contains Spotify keys, hidden in the dotenv file

* **.env-** Contains the actual Spotify key. This file is not uploaded on github (included in gitignore).

* **random.txt-** will run the liri-node-app when "node liri do-what-it-says" is run by user. The text in random.txt should follow the conventions in below section.

* **log.txt-** All the results after running the command as logged/appended to this file.

## 3. Working Commands

There are specified commands you need to use to run the app and are as follows,

### * Spotify

**Search Song-**
  *node liri.js spotify-this-song <song name here>*

**Results-**
* Song Name
* Song artists
* Song URL link
* Album name

### * Bans in Town

**Search Artist/Band-**
 *node liri.js concert-this <artist/band name here>*

**Results-**
* Artist Name
* Venue Location
* Date of the Event (MM/DD/YYYY)

### * Omdb Movie

**Search Movie-**
 *node liri.js movie-this <movie name here>*

**Results-**
* Movie Title
* Movie Year
* IMDB Rating
* Rotten Tomatoes Rating
* Country where movie produced
* Language of the movie
* Plot of the movie
* Actors in the movie

### * Random.txt
  
Takes information from "random.txt" file and giving output

**Search using random.txt file-**
 *node liri.js do-what-it-says*

**Results-**
This will be either of Spotify, Bands in Town or Omdb as described above

All the output is logged in "log.txt" file.

## 4. Demo-

* ![LIRI-NODE-APP Demo](video/liri.gif)

## 5. Technologies used-

### APIs-
* Bands in town
* OMDB
* Spotify

###Packages dependencies-

* **Axios**
Axios is used to call and get information from the api. Used specifically for OMDB and Bands in Town.

* **fs (File Storage)**
fs is used to access "log.txt" file and append the results in the "log.txt" file.

* **node-spotify-api**
node-spotify-api npm package is installed and called to get results from Spotify.

* **moment**
Moment npm package is included to format the date as DD/MM/YYYY in bands in town API results.

* **dotenv**
dotenv npm package is included to hide the spotify keys from being public.

## 6. Role-

This app is completely developed by me.