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
    console.log( error.response);
  });
}
getBandsInTown(nameHere);

//DELETE THIS AND USE AXIOS INSTEAD OF AJAX..

//   fs.writeFile("random.txt", res, function(err) {
//     if (err) { return console.log(err); }
//   });
  