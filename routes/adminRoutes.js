const express = require("express");
const router = express.Router();
const { scanUser, getRecentScans } = require("../controllers/scanController");
const { verifyAdmin } = require("../middleware/authMiddleware");

//Scanning ...
router.post("/scan/user", verifyAdmin, scanUser);
router.get("/scans/recent", verifyAdmin, getRecentScans);


module.exports = router; 