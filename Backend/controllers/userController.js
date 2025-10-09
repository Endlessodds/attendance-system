const user = require('../models/user');
const qrcode = require('qrcode');
const Event = require('../models/Event')
const bcrypt = require('bcryptjs');

// Optional model: some deployments may not have a UserActivation model.
let UserActivation = null;
try {
    UserActivation = require('../models/UserActivation');
} catch (err) {
    console.log("UserActivation model not found, skipping related functionality.");
}

//Fill out employee form
exports.createProfile = async (req, res) => {
    try {
        const {
            userId,
            phone,
            address,
            city,
            village,
            gender,
            dateOfBirth,
            carStatus,
            plateNumber,
            emergencyContactName,
            emergencyContactPhone
        } = req.body;

        // For file uploads, assuming you use multer and files are available in req.files
        const photo = req.files?.photo?.[0]?.path;
        const cvFile = req.files?.cvFile?.[0]?.path;

        const updatedUser = await user.findByIdAndUpdate(
            userId,
            {
                phone,
                address,
                city,
                village,
                gender,
                dateOfBirth,
                carStatus,
                plateNumber: carStatus === 'have' ? plateNumber : undefined,
                photo,
                cvFile,
                emergencyContact: {
                    name: emergencyContactName,
                    phone: emergencyContactPhone
                }
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch(err) {
        res.status(500).json({ message: 'Error updating profile', error: err.message });
    }
}

//View profile
exports.getProfile = async (req, res) => {
    try {
        // Find activation info (if available) and user profile
        let activation = null;
        if (UserActivation) {
            activation = await UserActivation.findOne({ userId: req.params.id });
        }

        const userProfile = await user.findById(req.params.id).select('-password');
        if (!userProfile)
            return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ user: userProfile, activation });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching profile', error: err.message });
    }
};

// Generate QR code
exports.getUserQRCode = async (req, res) => {
    try {
        // Check authentication (assumes req.user is set by auth middleware)
        if (!req.user || !req.user.userID) {
            return res.status(401).json({ message: 'Authentication required.' });
        }

        const userId = req.user.userID;
        const userProfile = await user.findById(userId).select('fullName email verified');
        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!userProfile.verified) {
            return res.status(403).json({ message: 'Super admin verification required.' });
        }

        const qrData = JSON.stringify({ userId: userProfile._id, name: userProfile.fullName });
        const qrImage = await qrcode.toDataURL(qrData);

        res.status(200).json({ qrImage });
    } catch (err) {
        res.status(500).json({ message: 'Error generating QR code', error: err.message });
    }
};

//QR Code for events
exports.getUserEventQRCode = async (req, res) => {
    try {
        const eventID = req.params.id;
        const userID = req.user.userID;
        const event = await Event.findById(eventID);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Only allow access if user is a verified attendee
        if (!event.attendees || !event.attendees.includes(userID)) {
            return res.status(403).json({ message: 'You are not authorized to access this event QR code.' });
        }

        // QR code must already be created by super-admin
        if (!event.qrCode) {
            return res.status(404).json({ message: 'QR code not available for this event.' });
        }

        res.status(200).json({ qrCode: event.qrCode });
    } catch (err) {
        res.status(500).json({ message: 'Error accessing event QR', error: err.message });
    }
};

//Change password
exports.changePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        //For logged in users only
        console.log("req.user:", req.user, "id param:", id);
        if (req.user.userID !== id) {
            return res.status(403).json({ message: 'Unauthorized' });
            
        }

        const founderUser = await user.findById(id);
        if (!founderUser)
            return res.status(404).json({ message: "User not found" });

        // check old password
        const isMatch = await bcrypt.compare(oldPassword, founderUser.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        // hash new password
        const salt = await bcrypt.genSalt(10);
        founderUser.password = await bcrypt.hash(newPassword, salt);

        await founderUser.save();
        res.status(200).json({ message: "Password changed successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error changing password', error: err.message });
        }
};

// logout
exports.logout = async (req, res) => {
    try {
        // For JWT, just tell client to delete token
        res.status(200).json({ message: 'Logged out successfully. Please delete your token on client.' });
    } catch (err) {
        res.status(500).json({ message: 'Error logging out', error: err.message });
    }
};

// Activation webhook: called by the super-admin system to mark a user as verified/active
exports.handleActivation = async (req, res) => {
    try {
        // Security: expect a shared secret in header X-SUPERADMIN-SECRET
        const incomingSecret = req.headers['x-superadmin-secret'] || req.headers['x-superadmin-secret'.toLowerCase()];
        const expectedSecret = process.env.SUPERADMIN_SECRET;

        if (!expectedSecret) {
            // If no secret is configured, refuse to proceed to avoid accidental exposure
            return res.status(500).json({ message: 'Server not configured for activation webhook' });
        }

        if (!incomingSecret || incomingSecret !== expectedSecret) {
            return res.status(401).json({ message: 'Invalid super-admin secret' });
        }

        const { userId, verified, isActive, activatedAt } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }

        if (typeof verified !== 'boolean' && typeof isActive !== 'boolean') {
            return res.status(400).json({ message: 'verified or isActive boolean is required' });
        }

        const update = {};
        if (typeof verified === 'boolean') update.verified = verified;
        if (typeof isActive === 'boolean') update.isActive = isActive;
        // If isActive not provided, default to verified value when present
        if (update.isActive === undefined && typeof update.verified === 'boolean') update.isActive = update.verified;
        if (activatedAt) update.verifiedAt = activatedAt;

        const updated = await user.findByIdAndUpdate(userId, update, { new: true });
        if (!updated) return res.status(404).json({ message: 'User not found' });

        return res.status(200).json({ message: 'User activation updated', user: updated });
    } catch (err) {
        console.error('Activation webhook error:', err);
        return res.status(500).json({ message: 'Error processing activation', error: err.message });
    }
};

