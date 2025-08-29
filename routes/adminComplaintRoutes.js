const express = require('express');
const router = express.Router();
const { sendComplaint, viewOwnComplaints, viewSingleComplaint } = require('../controllers/adminComplaintController');
const { verifyAdmin } = require('../middleware/authMiddleware');

// send a new complaint
router.post('/send', verifyAdmin, sendComplaint);

// view own complaints
router.get('/view', verifyAdmin, viewOwnComplaints);

// view single complaint
router.get('/:id', verifyAdmin, viewSingleComplaint);

module.exports = router;
