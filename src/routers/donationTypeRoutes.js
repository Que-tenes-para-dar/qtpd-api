const express = require('express');

const donationTypeRoutes = new express.Router();

const authenticateMw = require('../middlewares/authenticate');
const donationTypeService = require('../services/donationTypeService');
const DonationType = require('../models/donationTypeModel');

// =========================================================================
// Get all donation types
// =========================================================================
donationTypeRoutes.get('/', (req, res, next) => {
    return donationTypeService.getAllDonationTypes().then(donationTypes => res.send({
        success: true,
        data: donationTypes,
    })).catch(next);
});

// =========================================================================
// Create a new donation type
// =========================================================================
donationTypeRoutes.post('/', [authenticateMw.verifyToken, authenticateMw.isSuperAdmin], (req, res, next) => {
    try {
        const newDonationType = new DonationType({
            description: req.body.description,
            name: req.body.name,
        });
        return donationTypeService.createNewDonationType(newDonationType).then(savedDonationType => res.status(201).send({
            data: savedDonationType,
            message: 'DonationType created successfully',
            success: true
        })).catch(next);
    } catch (error) {
        next(error);
    }
});

// =========================================================================
// Delete a donation type by its id
// =========================================================================
donationTypeRoutes.delete('/:id', [authenticateMw.verifyToken, authenticateMw.isSuperAdmin], (req, res, next) => {
    return donationTypeService.deleteById(req.params.id).then(deletedDonationType => res.status(200).send({
        data: deletedDonationType,
        message: 'Donation type deleted succesfully',
        success: true
    })).catch(next);
});

module.exports = donationTypeRoutes;