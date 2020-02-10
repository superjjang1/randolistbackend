const express = require("express");
const spotifyWebApi = require("spotify-web-api-node");
const router = express.Router();
const scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private"
];
console.log("hello loginjs");

const spotifyApi = new spotifyWebApi({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:8010/'
});
console.log('asking');
console.log(spotifyApi.redirectUri);
const authorizeUrl = spotifyApi.createAuthorizeURL(scopes);

router.get("/",(req,res)=>{
    res.redirect(authorizeUrl);
});
router.get("/callback", (req,res)=>{
    const uri = process.env.FRONTEND_URI;
    console.log(uri);
    console.log('console logging uri');
    const code = req.query.code;
    spotifyApi
        .authorizationCodeGrant(code)
        .then(data =>{
            res.redirect(uri + "?access_token=" + data.body["access_token"]);
        })
        .catch(err => console.error(err));
})
module.exports = router;