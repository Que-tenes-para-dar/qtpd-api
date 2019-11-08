const express = require('express');

// middlewares
const authenticateMw = require('../middlewares/authenticate');
// services
const usersService = require('../services/userService');
// models
const User = require('../models/userModel');

const userRoutes = new express.Router();

userRoutes.post('/', [authenticateMw.verifyToken, authenticateMw.isSuperAdmin], async (req, res) => {
    const body = req.body;
    try {
        const user = new User({
            email: body.email,
            name: {
                firstName: body.firstName,
                lastName: body.lastName,
            },
            password: body.password,
            role: body.role,
            username: body.email
        });
        return usersService.createNewUser(user).then(savedUser => res.send({
            success: true,
            data: savedUser,
        })).catch(next);

    } catch (error) {
        next(error);
    }
});

module.exports = userRoutes;