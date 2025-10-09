const express = require('express');
const router = express.Router();
const { submitComplaint, getUserComplaints } = require("../controllers/complaintController");

// Submit complaints
router.post("/complaints", submitComplaint);

// View complaints
router.get("/:id/complaints", getUserComplaints);

module.exports = router;