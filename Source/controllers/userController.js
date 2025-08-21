const user = require('../models/user');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try{
        const newUser = await user.create({ name, email, password });
        console.log(newUser._id);
        res.status(201).json({ message: "User created", userID: newUser._id });
    } catch(error){
        console.error(error);
        res.status(500),json({ message: "Failed to create user", detais: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const users = await user.find({}, '-password');
        res.status(200).json(users);
    } catch(error) {
        console.error(error);
        res.status(500).json({ 
            message: 'Failed to get users',
            details: error.message
        });
    }
}

module.exports = { createUser, getUser };