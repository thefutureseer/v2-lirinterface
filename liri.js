//liri app
const axios = require("axios");

// var fs = require("fs");

// require("dotenv").config();
// const keys = require("./keys");

// //access keys info
// var spotify = new Spotify(keys.spotify);

//all the commands to iterate through
var comds = [
   `concert-this`,

   `spotify-this-song`,

   `movie-this`,

   `do-what-it-says`
]
//this will take the comand from the comand line
for (var i in comds){

  if (process.argv[2] == comds[i]) {
   console.log("great music goes here ____>")

  }
}

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
 getBandsInTown(nameHere);