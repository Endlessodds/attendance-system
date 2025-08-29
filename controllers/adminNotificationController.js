const Notification = require('../models/Notification');

const getAdminNotifications = async (req, res) => {
    try {
        const adminId = req.admin._id; // assuming admin is authenticated

        // Only fetch notifications for this admin
        const notifications = await Notification.find({ adminId }).sort({ createdAt: -1 });

        res.status(200).json({ notifications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getAdminNotifications };
