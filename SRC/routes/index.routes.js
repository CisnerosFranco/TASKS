const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require('../models/user');

require('../PASSPORT/auth-user');
require('../database/conection')


router.get('/', (req, res) => {
  res.redirect('/signin')
})

router.get('/signin', (req, res) => {
  res.render('signin', {
    viewtitle: 'TASK | Sign in'
  })
})

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/dashboard',
  failureRedirect: '/signin',
  failureFlash: true,
}))

router.get('/signup-user', (req, res) => {
  res.render('signup', {
    viewtitle: 'TASK | Sign up'
  });
})

router.post('/signup-user', passport.authenticate('local-signup', {
  successRedirect: '/dashboard',
  failureRedirect: '/signup-user',
  failureFlash: true,
}))

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/dashboard')
})


module.exports = router;