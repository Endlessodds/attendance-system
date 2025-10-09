const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require("../middleware/authMiddleware");

//Fill employee form
router.post('/profile', userController.createProfile);

// Activation webhook (called by super-admin)
router.post('/activation', userController.handleActivation);

//View employee profile
router.get('/profile/:id', userController.getProfile);

//Accessing qrcode
router.get('/qrcode/:id', userController.getUserQRCode);

//Accessing event qrcode
router.get('/event/qrcode/:id', userController.getUserEventQRCode);

//change password
router.put("/:id/password", auth, userController.changePassword);

// Logout
router.post('/:id/logout', auth, userController.logout);

module.exports = router;