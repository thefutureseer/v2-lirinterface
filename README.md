# lirinterface
*Language Interpretation and Recognition Interface*

## What is V2-Liri?
 This is like the Iphone siri except it's Language Interpretation and Recognition Interface therefore it takes in parameters you type into NODE.js and gives you back data.

## What the V2-liri does:
 LIRI will search Spotify for songs, BandsInTown.com for concerts, and contact list for phone numbers.

## How users can get started with the project
* Clone, 
* NPM init  and
* install dependencies:
  *   "axios": "^0.19.2",
  *  "dotenv": "^8.2.0",
  *  "inquirer": "^7.1.0",
  *  "moment": "^2.24.0",
  *  "node-spotify-api": "^1.1.1",
  *  "request": "^2.88.2"
* Use built in SEARCH commands such as:

  * _To search SPOTIFY:_
    > node liri.js spotify-this-song <Artist or Song name> + ENTER 
 
  * _To search BANDSINTOWN.com:_ 
    > node liri.js concert-this <Artist or Band name> + ENTER
 
  * _To search a theoretical CONTACTS LIST:_
    > node liri.js contact-list + ENTER scroll to the contact you want + ENTER 
     
  * _"Do what it says" will read from a text file and then search Spotify for that song:_
    > node liri.js do-what-it-says + ENTER

## Where users can get help:
Just drop me a line for any questions.


## Who maintains and contributes to the project?
I wrote this myself, TheFutureSeer. Any ideas to further the development just let me know.
