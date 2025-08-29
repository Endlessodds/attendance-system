const User = require("../../../User dashboard/Backend/models/user");
const Scan = require("../models/Scan");

//Scanning User QR
exports.scanUser = async (req, res) => {
    try {
        const { qrCode } = req.body;

        const User = await User.findOne({ qrCode });
        if (!User) 
            return res.status(404).json({ message: "User not found" });

        const scan = await Scan.create({
            type: "user",
            scannedId: User._id,
            scannedBy: req.admin._id
        });

        res.status(200).json({ message: "User scanned successfully", user: User, scan });
    } catch (err) {
        res.status(500).json({ message: "Error scanning user", error: err.message });
    }
};

// View Recent Scans
exports.getRecentScans = async (req, res) => {
    try {
        const scans = await Scan.find()
            .sort({ timestamp: -1 })
            .limit(20)
            .lean();

        // For each scan, fetch related details
        const populatedScans = await Promise.all(
            scans.map(async (scan) => {
                if (scan.type === "user") {
                    const user = await User.findById(scan.scannedId).select("name email qrCode");
                    return { ...scan, user };
                }
                return scan;
            })
        );

        res.status(200).json({ message: "Recent scans fetched", scans: populatedScans });
    } catch (err) {
        res.status(500).json({ message: "Error fetching scans", error: err.message });
    }
};