//liri app dependencies

//Read and set environment variables
require("dotenv").config();
//Import Node Spotify Api
const Spotify = require("node-spotify-api");
//Import api keys
const keys = require("./keys");
//Import axios
const axios = require("axios");
//Import require to select a contact for the phone book
const inquirer = require("inquirer")
//Import moment for date
const moment = require("moment");
//Import File System
//var fs = require("fs");

//Spotify info
var spotify = new Spotify(keys.spotify);

//Helper function to help get the name of the artist
var artistName = (artist) => artist.name;

//SPOTIFY
const spotifyMe = function(songHere) {
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
const getBandsInTown = bandNameHere => {

  var queryUrl = "https://rest.bandsintown.com/artists/" + bandNameHere + "/events?app_id=codingbootcamp";
  axios.get(queryUrl)
   .then( function(response) {
     var jsonData = response.data;

     if (!jsonData.length) {
       console.log("No results for " + bandNameHere);
       return;
     }

     for (var i = 0; i < jsonData.length; i++) {
      var show = jsonData[i];
       // Name of the city where venue is
      console.log( show.venue.city + " "
       //region or country and venue name.
      + (show.venue.region || show.venue.country) + " at "
      + show.venue.name +
       // Date of show.(use moment to format this as "MM/DD/YYYY")
      " Show Date: " + moment(show.datetime).format("MM/DD/YYYY") );
     }
   //end of first dot then statement  
   })
   .catch(error => {
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

const getContact = function() {
  inquirer.prompt([
    {
      type: "list",
      name: "Choice",
      choices: ["Leanne Graham", "Ervin Howell", "Clementine Bauch", "Patricia Lebsack", "Chelsey Dietrich", "Mrs. Dennis Schulist"],
      message: "Please submit name to pull their info from API"
    }
  ]).then(informa => {
    console.log(informa);



  // // use a *inquirer* to ask for a name?
  //
  //Query for axios with Name inquiry
  //fake api for phone book:
   axios.get("https://jsonplaceholder.typicode.com/users/") 
    .then(response => {
    var answer = informa.Choice;      
    const lupe = response.data;

      for (var i = 0; i < lupe.length; i++) {
        if (lupe[i].name === answer) {

          console.log("ID #: " + lupe[i].id + ", NAME: " + lupe[i].name
          + ", PHONE NUMBER: " + lupe[i].phone + ", ZIPCODE: " + lupe[i].address.zipcode
          );
        }
      }
    })
  //End of first dot then statement
  }).catch(err => {
     console.log(err);
    });
};



  // if (!movieHere.length) {
  //   console.log("Please try another title")
  // }

//}

//All the commands to iterate through with a switch
var pick = function(choys, functionData) {
  switch (choys) {
    case `concert-this`:
     getBandsInTown(functionData);
    break;

    case `spotify-this-song`:
     spotifyMe(functionData);
    break;

    case `contact-list`:
      getContact();
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