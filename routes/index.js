var express = require('express');
var router = express.Router();


var SpotifyWebApi = require('spotify-web-api-node');
scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private']

require('dotenv').config();

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.FRONTEND_URI,
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/auth/spotify', (req,res) => {
  var html = spotifyApi.createAuthorizeURL(scopes)
  res.redirect(html+"&show_dialog=true")  
})

router.get('/callback', async (req,res) => {
  const { code } = req.query;
  console.log(code)
  console.log('running code');
  try {
    var data = await spotifyApi.authorizationCodeGrant(code)
    const { access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    res.redirect('http://localhost:3000/');
  } catch(err) {
    res.redirect('/#/error/invalid token');
  }
});

router.get('/userinfo', async (req,res) => {
    try {
      var result = await spotifyApi.getMe();
      console.log(result.body);
      res.status(200).send(result.body)
    } catch (err) {
      res.status(400).send(err)
    }
});

router.get('/playlists', async (req,res) => {
  try {
    var result = await spotifyApi.getUserPlaylists();
    console.log(result.body);
    res.status(200).send(result.body);
  } catch (err) {
    res.status(400).send(err)
  }

});


router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/login");
});

module.exports = router;