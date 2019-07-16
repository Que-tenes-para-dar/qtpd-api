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

        const savedUser = await usersService.createNewUser(user);
        res.status(200).send({
            success: true,
            data: savedUser,
        });
    } catch (error) {
        res.status(400).send({
            error: error.message,
            message: 'There was an error trying to create a new user'
        });
    }
});

module.exports = userRoutes;