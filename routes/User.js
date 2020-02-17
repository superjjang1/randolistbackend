var express = require('express');
var router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const randToken = require('rand-token');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', (req,res,next)=>{
  const {
    name,
    spotifyid,
    email
  }= req.body;
  if ((!name)||(!spotifyid)||(!email)){
    res.json({
      msg: 'not working'
    });
    return;
  }

})

module.exports = router;