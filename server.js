require('dotenv').config();
const express = require("express");
const connectDB = require('./config/db');
const authRoutes = require ('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminComplaintRoutes = require('./routes/adminComplaintRoutes');
const adminNotificationRoutes = require('./routes/adminNotificationRoutes');

//creating an express app
const app = express();
app.use(express.json()); //Parse JSON bodies
connectDB(); //Connect to the database

//Mount routes
app.use('/auth', authRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/complaints", adminComplaintRoutes);
app.use("/admin/notifications", adminNotificationRoutes);

//Listening to incoming requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

