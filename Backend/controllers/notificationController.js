const Notification = require("../models/Notification");

// To get list of Notifications for the user
exports.getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.id });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};