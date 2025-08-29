const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["user"],
        required: true
    },
    scannedId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    scannedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Scan", scanSchema);