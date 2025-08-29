const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Attendance Error', 'System Issue', 'Other']
    },
    description: {
        type: String,
        required: true
    },
    attachments: {
        type: [String], // array of file URLs or paths
        default: []
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved', 'Rejected', 'Escalated'],
        default: 'Pending'
    },
    superAdminResponse: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);

