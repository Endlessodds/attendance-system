const express = require("express");

// Creating a specific url to listen to a post request
const app = express();
app.use(express.json());

// Custom validation middleware
function validateAttendance(req, res, next) {
    const { userID, timestamp } = req.body;
    if (!userID || !timestamp) {
        return res.status(400).json({ error: 'Missing userID or timestamp' });
    }
    next();
};

//Route for marking attendance
app.post("/attendance/mark", validateAttendance,(req, res) => {
    const { userID, timestamp } = req.body;
    res.send({ message: 'Attendance marked successfully', userID, timestamp })
});

//Listening to incoming requests
const port = 2000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
