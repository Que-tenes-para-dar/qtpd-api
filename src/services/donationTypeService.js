// models
const DonationType = require('../models/donationTypeModel');

const donationTypeService = {};

donationTypeService.createNewDonationType = async (donationType) => {
    return DonationType.createNewDonationType(donationType);
}

donationTypeService.getAllDonationTypes = async () => {
    return DonationType.getAllDonationTypes();
}

donationTypeService.deleteById = async (id) => {
    return DonationType.deleteOne({
        _id: id
    });
}

module.exports = donationTypeService;