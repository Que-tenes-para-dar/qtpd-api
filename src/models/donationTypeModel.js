const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const donationTypeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    description: {
        type: String,
        required: [true, 'La descripción es requerida']
    },
}, {
    collection: 'donationTypes'
});

donationTypeSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});

donationTypeSchema.statics.createNewDonationType = async function (donationType) {
    return donationType.save();
}

// =========================================================================
// This collection is sorted by the description
// =========================================================================
donationTypeSchema.statics.getAllDonationTypes = async function () {
    return this.find({}, null, {
        sort: {
            description: 1
        }
    }).exec();
}

module.exports = mongoose.model('DonationType', donationTypeSchema);