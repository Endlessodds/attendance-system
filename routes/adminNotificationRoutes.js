const express = require('express');
const router = express.Router();
const { getAdminNotifications } = require('../controllers/adminNotificationController');
const { verifyAdmin } = require('../middleware/authMiddleware'); 

// fetch all notifications for logged-in admin
router.get('/', verifyAdmin, getAdminNotifications);

module.exports = router;
