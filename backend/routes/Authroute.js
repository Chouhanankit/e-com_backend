// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/Authcontroller');

router.get('/google', authController.authenticateGoogle);
router.get('/google/callback', authController.googleAuthCallback);

module.exports = router;
