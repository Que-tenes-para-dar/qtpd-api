const Center = require('../models/centerModel');

const centerService = {};

centerService.createNewCenter = async (newCenterData) => {
    return Center.createNewCenter(newCenterData);
}

centerService.getAll = async () => {
    return Center.getAllCenters();
}

centerService.getCentersFiltered = async (centerFilter) => {
    return Center.getCentersFiltered(centerFilter);
}

centerService.deleteById = async (centerId) => {
    return Center.deleteOne({
        _id: centerId
    });
}


module.exports = centerService;