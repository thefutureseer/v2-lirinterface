console.log("This is loaded");

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.bandsInTown = {
  secret: process.env.BANDS_IN_TOWN_SECRET
};