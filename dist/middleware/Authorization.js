"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
async function authenticateUser(req, res, next) {
    const header = req.header('Authorization');
    if (!header) {
        return res.status(401).json({ msg: 'Access denied. No token provided.' });
    }
    const token = header.split(" ")[1];
    try {
        const decoded = await jwt.verify(token, "123456789");
        req.user = decoded.user;
        next();
    }
    catch (err) {
        console.log(err.message);
        return res.status(403).json({ msg: 'Invalid token.' });
    }
}
;
function authorizeAdmin(req, res, next) {
    const user = req.user;
    if (!user.isAdmin) {
        return res.status(403).json({ msg: 'Admin access required' });
    }
    next();
}
module.exports = {
    authenticateUser,
    authorizeAdmin
};
