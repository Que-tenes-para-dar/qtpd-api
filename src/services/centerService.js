const Center = require('../models/centerModel');
const centerTypes = require('../models/enums/centerTypes');

const centerService = {};

centerService.createNewCenter = async (newCenterData) => {
    return Center.createNewCenter(newCenterData);
}

centerService.deleteById = async (centerId) => {
    return Center.deleteOne({
        _id: centerId
    });
}

centerService.getAll = async () => {
    return Center.getAllCenters();
}

centerService.getCenterEmails = async () => {
    return Center.getCenterEmails();
}

centerService.getCentersFiltered = async (centerFilter) => {
    return Center.getCentersFiltered(centerFilter);
}

centerService.searchByQuery = async query => {
    if (!query) {
        return centerService.getAll();
    }
    const dbQuery = [{
            email: {
                '$regex': query,
                '$options': 'i'
            }
        },
        {
            city: {
                '$regex': query,
                '$options': 'i'
            }
        },
        {
            doorNumber: {
                '$regex': query,
                '$options': 'i'
            }
        },
        {
            department: {
                '$regex': query,
                '$options': 'i'
            }
        },
        {
            name: {
                '$regex': query,
                '$options': 'i'
            }
        },
        {
            phone: {
                '$regex': query,
                '$options': 'i'
            }
        },
        {
            street: {
                '$regex': query,
                '$options': 'i'
            }
        }
    ];
    return Center.find({
        $or: dbQuery
    }).populate('donationTypes', 'name description').exec();
}

centerService.searchByCenterType = async centerType => {
    if (centerType && centerTypes.enums[centerType]) {
        return Center.find({
            'centerType': centerType
        }).populate('donationTypes', 'name description').exec();
    }
    return [];
}

module.exports = centerService;