const Complaint = require('../models/Complaint');

//send complaint
const sendComplaint = async (req, res) => {
    try {
        const { category, description, attachments } = req.body;

        // Simple validation
        if (!category || !description) {
            return res.status(400).json({ message: 'Category and description are required' });
        }

        // Create complaint
        const newComplaint = new Complaint({
            userId: req.admin._id, 
            category,
            description,
            attachments: attachments || []
        });

        await newComplaint.save();

        res.status(201).json({ message: 'Complaint submitted successfully', complaint: newComplaint });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// view own complaints
const viewOwnComplaints = async (req, res) => {
    try {
        const adminId = req.admin._id; // assuming authenticated user

        // Find all complaints of the logged-in user
        const complaints = await Complaint.find({ userId: adminId }).sort({ createdAt: -1 });

        res.status(200).json({ complaints });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// view single complaint
const viewSingleComplaint = async (req, res) => {
    try {
        const adminId = req.admin._id;
        const complaintId = req.params.id;

        const complaint = await Complaint.findOne({ _id: complaintId, userId: adminId });

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.status(200).json({ complaint });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { sendComplaint, viewOwnComplaints, viewSingleComplaint };

