const express = require('express');

// services
const emailService = require('../services/emailService');
// models
const Email = require('../models/emailModel');

const emailRoutes = new express.Router();

// =========================================================================
// Sends an email
// =========================================================================
emailRoutes.post('/', (req, res, next) => {
    const body = req.body;
    const newEmail = new Email({
        sendersEmail: body.sendersEmail,
        sendersName: body.sendersName,
        emailText: body.emailText
    });
    return emailService.sendNewEmail(newEmail).then(sendEmailResult => res.status(200).send(sendEmailResult)).catch(next);
});

module.exports = emailRoutes;