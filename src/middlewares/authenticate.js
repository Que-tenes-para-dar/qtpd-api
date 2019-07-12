// external references
const jwt = require('jsonwebtoken');

const userService = require('../services/userService');

const authenticate = {};

authenticate.isAdmin = (req, res, next) => {
    if (userService.isAdmin(req.user)) {
        return next();
    }
    return res.status(401).send({
        message: 'Unauthorized.'
    });
}

authenticate.isAdminOrSuperAdmin = (req, res, next) => {
    if (userService.isAdminOrSuperAdmin(req.user)) {
        return next();
    }
    return res.status(401).send({
        message: 'Unauthorized.'
    });
}

authenticate.isSuperAdmin = (req, res, next) => {
    if (userService.isSuperAdmin(req.user)) {
        return next();
    }
    return res.status(401).send({
        message: 'Unauthorized.'
    });
}

authenticate.verifyToken = (req, res, next) => {
    try {
        const token = req.header('x-auth');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).send({
            message: 'Invalid token.'
        });
    }
}

module.exports = authenticate;