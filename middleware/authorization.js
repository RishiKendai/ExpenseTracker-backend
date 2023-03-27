const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret_key = process.env.SECRET_KEY;

module.exports.isAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    let userId = '';
    jwt.verify(token, secret_key, (err, decoded) => {
        if (err)
            return res.status(401).json({ message: "Not authorized<>" });
        else
            userId = decoded.userId;
    });
    req.id = userId;
    next();

};