const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/authController');

//Authentication
router.post('/admin/signup', registerAdmin);
router.post('/admin/login', loginAdmin);

module.exports = router;