require('dotenv').config();
const express = require("express");
const connectDB = require('./config/db');
const authRoutes = require ('./routes/authRoutes');
const userRoutes = require ('./routes/userRoutes')

//creating an express app
const app = express();
app.use(express.json()); //Parse JSON bodies
connectDB(); //Connect to the database

//Mount routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

//Listening to incoming requests
const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

