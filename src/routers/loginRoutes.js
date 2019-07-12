const express = require('express');
// services
const userService = require('../services/userService');

const loginRoutes = new express.Router();

// =========================================================================
// User login, returns user data and jwt
// =========================================================================
loginRoutes.post('/', async (req, res) => {
    try {
        let userAndToken = await userService.login(req.body.email, req.body.password);
        return res.status(200).header('x-auth', userAndToken.token).send({
            success: true,
            data: userAndToken.user
        });
    } catch (error) {
        return res.status(500).send({
            error,
            message: 'There was an error trying to log in the user'
        });
    }
});

module.exports = loginRoutes;