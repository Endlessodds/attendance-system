const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Get attendance status for a user
router.get('/status/:userId', attendanceController.getAttendanceStatus);

module.exports = router;
