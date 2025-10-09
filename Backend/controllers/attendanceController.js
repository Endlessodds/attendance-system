const Attendance = require('../models/Attendance');

// Get attendance status for a user
exports.getAttendanceStatus = async (req, res) => {
    try {
        const userId = req.params.userId;
        const attendance = await Attendance.findOne({ userId });
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
