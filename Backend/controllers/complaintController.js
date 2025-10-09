const Complaint = require("../models/Complaint");

//Submit complaints
exports.submitComplaint = async (req, res) => {
    try {
        const complaint = new Complaint({
            userId: req.body.userId,
            complaintText: req.body.complaintText
        });
        await complaint.save();
        res.status(201).json({ message: "Complaint submitted successfully", complaint });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//View complaints
exports.getUserComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ userId: req.params.id });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};