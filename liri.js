//liri app dependencies
//Read and set environment variables
require("dotenv").config();
//Import Node Spotify Api
const Spotify = require("node-spotify-api");
//Import api keys
const keys = require("./keys");
//Import axios 
const axios = require("axios");
//Import File System
//var fs = require("fs");

//Spotify info
var spotify = new Spotify(keys.spotify);

//Helper function to help get the name of the artist
var artistName = function(artist) {
  return artist.name
}

//SPOTIFY
var spotifyMe = function(songHere) {
  //Check if user added an entry for spotify to find
  
  //spitify search query
  spotify.search(
    
    {
      type: "track", 
      query: songHere ?  songHere : "The Sign",
      limit: 3
          
    }, 
    function(err, data) {

      if (err) {
        console.log("Error occurred" + err);
        return;
      }

      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {
        //Artist name     
        console.log("Artist name "+ songs[i].artists.map(artistName));
        //Song name
        console.log("Song name "+ songs[i].name);
        //Track number
        console.log("Track number "+ songs[i].track_number);
        //A preview link of the songs from Spotify
        console.log("Album preview link to SPotify "+ songs[i].preview_url);
        //The album that the songs is from
        console.log("Album: " + songs[i].album.name);
        // console.log(r/n);
        console.log('---------------------------------------------------')
        //console.log(songs);
      }  
   }
 );
};

//BANDS IN TOWN
function getBandsInTown(bandNameHere) {
  // var keyurl = "?app_id=codingbootcamp";
  // var queryUrl = "https://rest.bandsintown.com/artists/" + bandNameHere + keyurl;
  
  axios.get("https://rest.bandsintown.com/artists/" + bandNameHere + "?app_id=codingbootcamp")
   .then(response => {

    // Name of the venue
    console.log(response);
    // Venue location
    console.log(response);
    // Date of the Event (use moment to format this as "MM/DD/YYYY")
    console.log(response);
   }).catch(error => {
    if (error.response) {
      //If the request was made and the server responded with a status code outside of 2xx
      console.log( error.response.name);
      
    } else if (error.request) {
      //If request was made but no response was recieved. 
      //"Error.request" is an object that comes back with details pertaining to the error 
      console.log(error.request);
      
    } else {
      //If something happened when setting up the request that triggered the error
      console.log("Error", error.message);
    }
     console.log(error.config);
  });
}

//all the commands to iterate through with a switch 
var pick = function(choys, functionData) {
  switch (choys) {
    case `concert-this`:
     getBandsInTown(functionData);
    break;
    
    case `spotify-this-song`:
     spotifyMe(functionData);
    break;
    
    case `movie-this`:
      movieLookUp(functionData);
    break;
  
    case `do-what-it-says`:
      doThis();
    break;
  };
}
 var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo)   
 }

 runThis(process.argv[2], process.argv.slice(3).join(" "));