import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken')

async function authenticateUser (req:any, res: Response, next: NextFunction) {
    const header = req.header('Authorization');

    if (!header) {
        return res.status(401).json({ msg: 'Access denied. No token provided.' });
    }

    const token = header.split(" ")[1]
    

    try {
        const decoded = await jwt.verify(token, "123456789");

        req.user = decoded.user

        next();
    } catch (err:any) {
        console.log(err.message)
        return res.status(403).json({ msg: 'Invalid token.' });
    }
};

function authorizeAdmin (req:any, res: Response, next: NextFunction){
    const user = req.user;
    if (!user.isAdmin) {
        return res.status(403).json({ msg: 'Admin access required' });
    }
    next();
}

module.exports = {
    authenticateUser,
    authorizeAdmin
}
