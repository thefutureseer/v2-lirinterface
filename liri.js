//liri app
const axios = require("axios");
const Spotify = require("node-spotify-api");

var fs = require("fs");

require("dotenv").config();
const keys = require("./keys");

//Spotify info
var spotify = new Spotify(keys.spotify);


//all the commands to iterate through
var comds = [
  `concert-this`,
  
  `spotify-this-song`,
  
  `movie-this`,
  
  `do-what-it-says`
];

var nameHere = process.argv[3];
function getBandsInTown(nameHere) {
  // var keyurl = "?app_id=codingbootcamp";
  // var queryUrl = "https://rest.bandsintown.com/artists/" + nameHere + keyurl;
  
  axios.get("https://rest.bandsintown.com/artists/" + nameHere + "?app_id=codingbootcamp").then(response => {
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

//this will take the comand from the comand line
var choys = process.argv[2];
for (var i in comds){
  //write the choice to random text file
  fs.writeFile("random.txt", " " + choys + " ", function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("Choice logged to the random text file");
  });
  
  if (choys == comds[0]) {
    getBandsInTown(nameHere);
    console.log("Concert command goes here ____>")

  } else if (choys === comds[1]) {
    //spitify search query
      spotify.request("https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx")
       .then(function( data) {
          console.log(data);
          console.log("Que Spotify song now")

       }).catch(function(err) { 
          console.error("Error occurred" + err);
       });
  }
}