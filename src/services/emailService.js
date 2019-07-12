const nodemailer = require('nodemailer');
// models
const Email = require('../models/emailModel');

const emailService = {};

const emailUser = process.env.EMAIL_USER || '';
const gmailClientId = process.env.GMAIL_CLIENT_ID || '';
const gmailClientSecret = process.env.GMAIL_CLIENT_SECRET || '';
const gmailRefreshToken = process.env.GMAIL_REFRESH_TOKEN || '';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: emailUser,
        clientId: gmailClientId,
        clientSecret: gmailClientSecret,
        refreshToken: gmailRefreshToken,
    }
});

emailService.sendNewEmail = async (email) => {
    const text = `Nombre: ${email.sendersName}.\nEmail: ${email.sendersEmail}\nMensaje:\n${email.emailText}`;
    const mailOptions = {
        from: email.sendersEmail,
        to: emailUser,
        subject: `${email.sendersName} - Contacto desde la página`,
        text
    };

    try {
        const sendEmailResponse = await transporter.sendMail(mailOptions);
        if (sendEmailResponse.accepted.length) {
            email.sent = true;
        }
        Email.createNewEmail(email);
        return {
            success: true,
            message: 'The email was successfully sent'
        };
    } catch (error) {
        return {
            success: false,
            message: 'There was an error trying to send the email',
            error: error.message,
        }
    }
}

module.exports = emailService;