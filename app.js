require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");        
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/User');
var authRouter = require('./routes/auth');
// const SpotifyWebApi = require('spotify-web-api-node');
var spotifyRouter = require('./routes/spotify');
const PORT = 3010;
dotenv.config();
require("./config/passport")(passport);

var app = express();
const helmet = require('helmet');
app.use(helmet());

// Retrieve an access token
// spotifyApi.clientCredentialsGrant().then(
//   function(data) {
//     console.log('The access token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);
 
//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//   },
//   function(err) {
//     console.log('Something went wrong when retrieving an access token', err);
//   }
// );

// Allow cross-origin.....
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/spotify', spotifyRouter);
// app.use('/users', usersRouter);
app.use('/auth', authRouter)

app.listen(PORT, ()=> console.log(`listening on ${PORT}`));
// console.log(spotifyApi);
module.exports = app;
