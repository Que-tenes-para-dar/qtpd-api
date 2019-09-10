const express = require('express');
const qs = require('qs');

const centerService = require('../services/centerService');
const authenticate = require('../middlewares/authenticate');

const centerRouter = new express.Router();
const Center = require('../models/centerModel');

// =========================================================================
// Get all centers without filtering
// =========================================================================
centerRouter.get('/', async (req, res) => {
    try {
        const centers = await centerService.getAll();
        const result = {
            success: true,
            data: centers
        };
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({
            message: 'Error trying to get the centers',
            error
        });
    }
});

// =========================================================================
// Get all centers filtered
// =========================================================================
centerRouter.get('/filtered/:latitude/:longitude/:maxDistance/:donationTypes?', async (req, res, next) => {
    try {
        const centerFilter = {
            donationTypes: req.params.donationTypes ? req.params.donationTypes.split(',') : [],
            latitude: parseFloat(req.params.latitude),
            longitude: parseFloat(req.params.longitude),
            maxDistance: parseInt(req.params.maxDistance),
        }
        const centers = await centerService.getCentersFiltered(centerFilter);
        res.status(200).send({
            success: true,
            data: centers,
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error trying to get the centers filtered',
            error
        });
    }
});

// =========================================================================
// Create a new center with the data received  in the body
// =========================================================================
centerRouter.post('/', [authenticate.verifyToken, authenticate.isSuperAdmin], async (req, res) => {
    const body = req.body;
    try {
        const newCenter = new Center({
            centerType: body.centerType,
            city: body.city,
            department: body.department,
            description: body.description,
            donationTypes: body.donationTypes.split(','),
            doorNumber: (body.doorNumber === undefined) ? '' : body.doorNumber,
            email: body.email,
            loc: {
                "type": "Point",
                "coordinates": [parseFloat(body.longitude), parseFloat(body.latitude)],
            },
            name: body.name,
            phone: body.phone,
            street: body.street,
            workingHours: body.workingHours,
            zipCode: body.zipCode,
        });
        const savedCenter = await centerService.createNewCenter(newCenter);
        res.status(201).send({
            success: true,
            data: savedCenter,
            message: 'Center created with success',
        });
    } catch (error) {
        console.warn('Center creation error: ', error);
        res.status(500).send({
            error: error.message,
            message: "Error creating the center",
        });
    }
});

// =========================================================================
// Delete a center by its id
// =========================================================================
centerRouter.delete('/:id', [authenticate.verifyToken, authenticate.isSuperAdmin], async (req, res) => {
    try {
        const deletedCenter = await centerService.deleteById(req.params.id);
        res.status(200).send({
            success: true,
            message: 'Center deleted succesfully',
            data: deletedCenter
        });
    } catch (error) {
        res.status(500).send({
            error,
            message: 'Error trying to delete the center'
        });
    }
});

// =========================================================================
// Search centers by the query received in the body
// =========================================================================
centerRouter.post('/searchByQuery', /*[authenticate.verifyToken, authenticate.isAdminOrSuperAdmin], */ (req, res, next) => {
    return centerService.searchByQuery(req.body.query).then(centers => res.send({
        success: true,
        data: centers
    })).catch(next);
});

module.exports = centerRouter;