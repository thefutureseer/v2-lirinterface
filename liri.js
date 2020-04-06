//liri app dependencies
const axios = require("axios");
const Spotify = require("node-spotify-api");
var fs = require("fs");
require("dotenv").config();
const keys = require("./keys");

//Spotify info
var spotify = new Spotify(keys.spotify);

//this will take the comand from the comand line
var choys = process.argv[2];
var nameHere = process.argv[3];

//all the commands to iterate through with a switch 

switch (choys) {
 case `concert-this`:
  getBandsInTown();
  break;
  
 case `spotify-this-song`:
  spotifyMe();
   break;
  
 case `movie-this`:
   movieLookUp();
  break;

 case `do-what-it-says`:
   doThis();
   break;
};



function getBandsInTown(nameHere) {
  // var keyurl = "?app_id=codingbootcamp";
  // var queryUrl = "https://rest.bandsintown.com/artists/" + nameHere + keyurl;
  
  axios.get("https://rest.bandsintown.com/artists/" + nameHere + "?app_id=codingbootcamp").then(response => {

    // Name of the venue
    console.log(response);
    // Venue location

    // Date of the Event (use moment to format this as "MM/DD/YYYY")
    
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

function spotifyMe() {

  //write the choice to random text file
  fs.appendFile("random.txt", "Previously played " + nameHere + " ", function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("Choice logged to the random text file");
  });
  
    //spitify search query
      spotify.request("https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx")
       .then(function( data) {

          //Artist name     
          console.log("Artist name "+ data.name);
          console.log("Track number "+ data.track_number);
          // A preview link of the song from Spotify
          console.log("Album preview link to SPotify "+ data.external_urls);
          // The album that the song is from
          //console.log(data.);


     

       }).catch(function(err) { 
          console.error("Error occurred" + err);
       });
}