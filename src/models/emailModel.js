const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

const Schema = mongoose.Schema;

const emailSchema = new Schema({
    sendersEmail: {
        type: String,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} no es un email válido'
        }
    },
    sendersName: {
        type: String,
        required: [true, 'El nombre del emisor no puede ser vacío']
    },
    sent: {
        type: Boolean,
        default: false
    },
    emailText: {
        type: String,
        required: [true, 'El email no puede ser vacío'],
        minlength: [20, 'Debe ingresar al menos 50 caracteres']
    }
}, {
    collection: 'emails'
});

emailSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});

emailSchema.statics.createNewEmail = async function (email) {
    return email.save();
}

module.exports = mongoose.model('Email', emailSchema);