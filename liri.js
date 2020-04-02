//liri app
// require("dotenv").config();
// const keys = require("./keys");

// //access keys info
// var spotify = new Spotify(keys.spotify);

//object with all the commands to iterate through
var comds = [
   `concert-this`,

   `spotify-this-song`,

   `movie-this`,

   `do-what-it-says`
]
//this will take the comand from the comand line
for (var key in comds){

  if (process.argv[2] == comds[key]) {
   console.log("great music goes here ____>")

  }
}