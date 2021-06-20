const dotenv = require('dotenv');
const JWT = require('jsonwebtoken');
const mySecret = process.env.SECRET

dotenv.config();
const verifyToken = async (req, res, next) => {
    const token = req.cookies.acces_token || '';
    try {
        if (!token) {
            return res.status(401).json('You need to Login')
    }
    const decrypt = await JWT.verify(token, mySecret);
    req.user = {
        id:decrypt.id,
        name:decrypt.name,
        admin:decrypt.admin
    };
    next();
    } catch (err) {
        return res.status(500).json(err.toString());
    }
};

module.exports = verifyToken;
