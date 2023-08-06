const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "User has successfully authenticated",
      user: req.user
    });
  } else {
    res.status(401).json({
      success: false,
      message: "User not authenticated"
    });
  }
});

router.get('/login/failed', (req, res) => {
  res.status(400).json({
    success: false,
    message: "User failed to authenticate"
  });
});

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate("google", {
   successRedirect: `${process.env.CLIENT_URL}`+"/home",
  failureRedirect: '/login/failed'
}))

router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.redirect(`${process.env.CLIENT_URL}`);
});

module.exports = router;
