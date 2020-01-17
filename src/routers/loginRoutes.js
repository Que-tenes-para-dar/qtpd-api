const express = require('express');
// services
const userService = require('../services/userService');

const loginRoutes = new express.Router();

// =========================================================================
// User login, returns user data and jwt
// =========================================================================
loginRoutes.post('/', (req, res, next) => {
    return userService.login(req.body.email, req.body.password).then(userAndToken => res.status(200).header('x-auth', userAndToken.token).send({
        success: true,
        data: userAndToken.user
    })).catch(next);
});

module.exports = loginRoutes;