const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

exports.verifyAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token)
            return res.status(401).json({ message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);

        if (!admin || admin.role !== "admin") {
            return res.status(403).json({ message: "Access denied, Admins only" });
        }

        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token", error: error.message });
    }
};