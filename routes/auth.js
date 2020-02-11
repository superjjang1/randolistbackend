const express = require("express");
const passport = require("passport");
const router = express.Router();
const scope = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private"
];

router.get("/spotify", passport.authenticate("spotify",{scope}));

router.get("/login/success", (req, res) => {
    if (req.user) {
      res.json({
        success: true,
        message: "user has successfully authenticated",
        user: req.user
      });
    } else {
      res.sendStatus(403);
    }
  });
  
  router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "user failed to authenticate."
    });
  });
  
  router.get(
    "/spotify/redirect",
    passport.authenticate("spotify", {
      successRedirect: process.env.FRONTEND_URL,
      failureRedirect: "/auth/login/failed"
    })
  );
  
  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.FRONTEND_URL);
  });
  
  module.exports = router;