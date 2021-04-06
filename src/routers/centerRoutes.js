const express = require('express');
const qs = require('qs');

const centerService = require('../services/centerService');
const authenticate = require('../middlewares/authenticate');

const centerRouter = new express.Router();
const Center = require('../models/centerModel');

// =========================================================================
// Get all active centers - add `?includeInactive=true` to also include inactive ones
// =========================================================================
centerRouter.get('/', (req, res, next) => {
    const includeInactive = !!req.query.includeInactive && req.query.includeInactive.toLowerCase() === 'true';
    centerService.getAll(includeInactive).then(centers => {
        res.send({
            success: true,
            data: centers
        });
    }).catch(next);
});

// =========================================================================
// Get all centers filtered
// =========================================================================
centerRouter.get('/filtered/:latitude/:longitude/:maxDistance/:donationTypes?', (req, res, next) => {
    try {
        const centerFilter = {
            donationTypes: req.params.donationTypes ? req.params.donationTypes.split(',') : [],
            latitude: parseFloat(req.params.latitude),
            longitude: parseFloat(req.params.longitude),
            maxDistance: parseInt(req.params.maxDistance),
        }
        return centerService.getCentersFiltered(centerFilter).then(centers => res.send({
            success: true,
            data: centers
        })).catch(next);
    } catch (error) {
        next(error);
    }
});

centerRouter.get('/emails', [authenticate.verifyToken, authenticate.isAdmin], (req, res, next) => {
    return centerService.getCenterEmails().then(centers => {
        const csvCenters = centers.map(c => c.email);
        return res.send({
            csvCenters
        })
    }).catch(next);
});

// =========================================================================
// Create a new center with the data received  in the body
// =========================================================================
centerRouter.post('/', [authenticate.verifyToken, authenticate.isSuperAdmin], (req, res, next) => {
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

        return centerService.createNewCenter(newCenter).then(savedCenter => res.status(201).send({
            success: true,
            data: savedCenter,
            message: 'Center created with success',
        })).catch(next);
    } catch (error) {
        console.warn('Center creation error: ', error);
        return next(error);
    }
});

// =========================================================================
// Delete a center by its id
// =========================================================================
centerRouter.delete('/:id', [authenticate.verifyToken, authenticate.isSuperAdmin], (req, res, next) => {
    try {
        return centerService.deleteById(req.params.id).then(deletedCenter => res.send({
            success: true,
            message: 'Center deleted succesfully',
            data: deletedCenter
        })).catch(next);
    } catch (error) {
        next(error);
    }
});

// =========================================================================
// Search centers by the query received in the body
// =========================================================================
centerRouter.post('/searchByQuery', (req, res, next) => {
    return centerService.searchByQuery(req.body.query).then(centers => res.send({
        success: true,
        data: centers
    })).catch(next);
});

// =========================================================================
// Search centers by the type received in the queryString
// =========================================================================
centerRouter.get('/byType/', (req, res, next) => {
    return centerService.searchByCenterType(req.query.centerType).then(centers => res.send({
        success: true,
        data: centers
    })).catch(next);
});

// =========================================================================
// Sets active true or false for the center with _id=centerId
// =========================================================================
centerRouter.post('/setIsActive', [authenticate.verifyToken, authenticate.isSuperAdmin], (req, res, next) => {
    const { isActive, centerId } = req.body;
    return centerService.setIsActive({
        centerId,
        isActive: isActive.toLowerCase() === 'true'
    }).then(() => res.send({
        success: true,
    })).catch(next);
});

// =========================================================================
// Sets all centers as active
// =========================================================================
centerRouter.post('/setAllActive', [authenticate.verifyToken, authenticate.isSuperAdmin], (req, res, next) => {
    return centerService.setAllActive().then(() => res.send({
        success: true,
    })).catch(next);
});

module.exports = centerRouter;