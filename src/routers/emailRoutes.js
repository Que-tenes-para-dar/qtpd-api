const express = require('express');

// services
const emailService = require('../services/emailService');
// models
const Email = require('../models/emailModel');

const emailRoutes = new express.Router();

// =========================================================================
// Sends an email
// =========================================================================
emailRoutes.post('/', async (req, res) => {
    const body = req.body;
    try {
        const newEmail = new Email({
            sendersEmail: body.sendersEmail,
            sendersName: body.sendersName,
            emailText: body.emailText
        });

        const sendEmailResult = await emailService.sendNewEmail(newEmail);
        res.status(200).send(sendEmailResult);
    } catch (error) {
        res.status(400).send({
            error: error.message,
            message: 'There was an error trying to send an email'
        });
    }
});

module.exports = emailRoutes;