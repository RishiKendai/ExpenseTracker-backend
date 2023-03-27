/// Validate user data
module.exports.validate = async (req, res, next) => {
    const { name, gender, dob, email, password, phone } = req.body;
    // name
    if (name === '' || name.length < 3 || name.length > 14)
        return res.json({ status: false, msg: 'Invalid user name!' });
    // gender
    if (gender === '' || (gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female' && gender.toLowerCase() !== 'others'))
        return res.json({ status: false, msg: 'Invalid gender!' });
    // dob
    const timestamp = Date.parse(dob);
    if (dob === '' || isNaN(timestamp))
        return res.json({ status: false, msg: 'Invalid date format!' });
    // email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !regex.test(email))
        return res.json({ status: false, msg: 'Invalid user name!' });
    // password
    if (password === '' || password.length < 3 || password.length > 16)
        return res.json({ status: false, msg: 'Invalid password!' });
    // phone
    if (phone === '' || phone.length !== 10 || isNaN(phone))
        return res.json({ status: false, msg: 'Invalid phone number!' });
    next();
};