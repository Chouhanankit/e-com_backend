// backend/controllers/authController.js

const passport = require('passport');
const User = require('../models/Googlemodel');

exports.authenticateGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleAuthCallback =  passport.authenticate('google', { failureRedirect: '/login' }),
(req, res) => {
  // Successful authentication, redirect to frontend URL
  res.redirect('http://localhost:5173');
}