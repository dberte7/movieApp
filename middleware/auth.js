const rol = require("../utils/userOrAdmin");

const checkAuth = (req, res, next) =>{
    console.log('auth');
    console.log(req.body);
    console.log("Authenticate if identity is confirmed next");

    next()
}

module.exports = checkAuth