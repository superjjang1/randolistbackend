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
    redirectUri: 'http://localhost:8010/callback'
});
console.log(process.env.SPOTIFY_CLIENT_ID)
console.log(spotifyApi.clientID)
console.log('asking');
console.log(spotifyApi.redirectUri);
const authorizeUrl = spotifyApi.createAuthorizeURL(scopes);

router.get("/",(req,res)=>{
    res.redirect(authorizeUrl);
});
router.get("/callback", async (req, res) => {
    try {
        const uri = process.env.FRONTEND_URI || "http://localhost:3000";
        const code = req.query.code;
        const tokens = await spotifyApi.authorizationCodeGrant(code);
        const { access_token } = tokens.body;
        console.log(`${uri}?access_token=${access_token}`);
        res.redirect(`${uri}?access_token=${access_token}`);
    } catch (err) {
        console.error(err);
    }
});
module.exports = router;