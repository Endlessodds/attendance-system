const express = require("express");
const router = express.Router();
const { getUserNotifications } = require("../controllers/notificationController");

// Notifications
router.get("/:id/notifications", getUserNotifications);

module.exports = router;