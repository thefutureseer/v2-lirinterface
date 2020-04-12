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
const fs = require("fs");
const os = require("os");

//Spotify info
const spotify = new Spotify(keys.spotify);

//Helper function to help get the name of the artist
const artistName = artist => artist.name;

//SPOTIFY
const spotifyMe = songHere => {
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
        const song = songs[i];
       //Artist name
       var infoData = 
        " Artist name: " + song.artists.map(artistName) + os.EOL +
        //Song name
        " Song name: " + song.name + os.EOL + 
            //Track number
        " Track number: " + song.track_number + os.EOL +
            //A preview link of the songs from Spotify
        " Album preview link to SPotify: " + song.preview_url + os.EOL +
            //The album that the songs is from
        " Album: " + song.album.name ;

       //console.log(songs);
       //Log data to a text file
       fs.appendFile("log.txt", infoData + os.EOL, (err, res) => {
        if (err) {
          console.log(err)
        }

       });
        console.log("-------------All logged to text file -------------- response text below ---------");

        //Show results in console with line breaks
        console.log(infoData.split(os.EOL));      
    }
   }
 );
};

//BANDS IN TOWN
const getBandsInTown = bandNameHere => {

  const queryUrl = "https://rest.bandsintown.com/artists/" + bandNameHere + "/events?app_id=codingbootcamp";
  axios.get(queryUrl)
   .then( response => {
     const jsonData = response.data;

     if (!jsonData.length) {
       console.log("No results for " + bandNameHere);
       return;
     }

     for (var i = 0; i < jsonData.length; i++) {
      const show = jsonData[i];
       // Name of the city where venue is
      console.log( show.venue.city + os.EOL + " "
        //region or country and venue name.
        + (show.venue.region || show.venue.country) + " at "
        + show.venue.name + os.EOL +
        // Date of show.(use moment to format this as "MM/DD/YYYY")
        " Show Date: " + moment(show.datetime).format("MM/DD/YYYY") + os.EOL
      );
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

  // // use inquirer to ask for a name
  
  //Query for axios with Name inquiry
  //fake api for phone book:
   axios.get("https://jsonplaceholder.typicode.com/users/") 
    .then(response => {
    const answer = informa.Choice;      
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

//Function for "doWhatItSays"
const doThis = function() {
  //Read the random text file
  fs.readFile("random.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err)
    } else {

  //Get a command / text from random text file to add into spotify function
      const randomTxt = data; 
      
  //run spotify function with the text from random file
  spotifyMe(randomTxt);    
    }
  })
}

//All the commands to iterate through with a switch
const pick = function(choys, functionData) {
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
 const runThis = function(argOne, argTwo) {
  pick(argOne, argTwo)
 }

 runThis(process.argv[2], process.argv.slice(3).join(" "));