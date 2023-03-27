// /api/user
const User = require('../model/user');
const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

/// (POST) Create user 
module.exports.create = async (req, res) => {
    let { name, gender, dob, email, password, phone } = req.body;

    const hasUser = await User.findOne({ email });
    if (hasUser) return res.json({ status: false, msg: 'email already exist!' });
    try {
        const hashedPassword = await bcryptjs.hash(password, 10);
        let response = await User.create({ name, gender, dob, email, password: hashedPassword, phone });
        const token = jwt.sign({ userId: response._id }, secretKey, { expiresIn: '1d' });
        res.status(200).json({ status: true, token: token, name: response.name });
    }
    catch (e) {
        console.log("error: ", e);
        return res.json({ status: false, msg: "Couldn't create user" });
    }
};

/// (POST) Login user 
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user)
        return res.json({ status: false, msg: 'Incorrect email' });
    const decryptedPassword = await bcryptjs.compare(password, user.password);
    if (!decryptedPassword)
        return res.json({
            status: false,
            msg: 'Invalid password'
        });
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1d' });
    res.status(200).json({ status: true, token: token, name: user.name });

};


/// (POST) Edit User details
module.exports.edit = async (req, res) => {
    const id = req.id;
    const updateFields = req.body;
    try {
        const result = await User.findOneAndUpdate({ _id: id }, { $set: updateFields }, { new: true });
        let formatedUser = result.toObject();
        delete formatedUser._id;
        delete formatedUser.password;
        return res.status(200).json({ status: true, user: formatedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Could not update the user." });
    }

};