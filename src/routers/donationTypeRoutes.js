const express = require('express');

const donationTypeRoutes = new express.Router();

const authenticateMw = require('../middlewares/authenticate');
const donationTypeService = require('../services/donationTypeService');
const DonationType = require('../models/donationTypeModel');

// =========================================================================
// Get all donation types
// =========================================================================
donationTypeRoutes.get('/', async (req, res, next) => {
    try {
        const donationTypes = await donationTypeService.getAllDonationTypes();
        res.status(200).send({
            success: true,
            data: donationTypes,
        });
    } catch (error) {
        res.status(500).send({
            error,
            message: 'Error trying to retrieve all donation types'
        });
    }
});

// =========================================================================
// Create a new donation type
// =========================================================================
donationTypeRoutes.post('/', [authenticateMw.verifyToken, authenticateMw.isSuperAdmin], async (req, res) => {
    const body = req.body;
    try {
        const newDonationType = new DonationType({
            description: body.description,
            name: body.name,
        });
        const savedDonationType = await donationTypeService.createNewDonationType(newDonationType);
        res.status(201).send({
            data: savedDonationType,
            message: 'DonationType created successfully',
            success: true
        });
    } catch (error) {
        res.status(500).send({
            error,
            message: "Error when creating the donationType"
        });
    }
});

// =========================================================================
// Delete a donation type by its id
// =========================================================================
donationTypeRoutes.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedDonationType = await donationTypeService.deleteById(id);
        res.status(200).send({
            data: deletedDonationType,
            message: 'Donation type deleted succesfully',
            success: true
        });
    } catch (error) {
        res.status(500).send({
            error,
            message: `Error trying to delete the donation type with id ${id}`
        });
    }
})

module.exports = donationTypeRoutes;