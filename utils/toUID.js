const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY;

module.exports = (token) => {
    try {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret_key, (err, decoded) => {
                if (err)
                    reject(null);
                else
                    resolve(decoded.userId);
            });
        });
    } catch (e) {
        console.log('eeeeeeeeeeee ', e);
    }
};