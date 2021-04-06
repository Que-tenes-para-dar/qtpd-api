const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const Schema = mongoose.Schema;

const centerTypes = require('./enums/centerTypes');

const centerSchema = new Schema({
    isActive: {
        type: Boolean,
        default: true,
    },
    apartmentNumber: {
        type: String,
        required: false
    },
    centerType: {
        type: String,
        required: [true, 'El tipo de centro es requerido'],
        enum: Object.values(centerTypes.enums)
    },
    city: {
        type: String,
        required: [true, 'La ciudad es requerida']
    },
    department: {
        type: String,
        required: [true, 'El departamento es requerido']
    },
    description: {
        type: String,
        required: [true, 'La descripción es requerida']
    },
    donationTypes: [{
        type: Schema.Types.ObjectId,
        ref: 'DonationType',
        required: true,
    }],
    doorNumber: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El correo es requerido'],
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    loc: {
        type: {
            type: String
        },
        coordinates: [],
    },
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    phone: {
        type: String,
        required: false
    },
    street: {
        type: String,
        required: [true, 'La dirección es requerida']
    },
    workingHours: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: false
    }
}, {
    collection: 'centers'
});

centerSchema.index({
    'loc': '2dsphere'
});

centerSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});

centerSchema.path('donationTypes').validate(function (donationTypes) {
    return donationTypes.length > 0;
}, 'El centro debe recibir al menos un tipo de donacion.');

centerSchema.statics.getAllCenters = async function (includeInactive) {
    let query = {}
    if (!includeInactive) {
        query = { isActive: true }
    }
    return this.find(query)
        .populate('donationTypes', 'name description')
        .exec();
}

centerSchema.statics.createNewCenter = async function (center) {
    return center.save();
}

centerSchema.statics.getCenterEmails = async function () {
    return this.find({}).select('email');
}

centerSchema.statics.getCentersFiltered = async function (centerFilter) {
    try {
        const query = {
            loc: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [centerFilter.longitude, centerFilter.latitude]
                    },
                    $maxDistance: (centerFilter.maxDistance * 1000) // parse the distance from meters to kms
                }
            }
        };
        if (centerFilter.donationTypes.length) {
            query.donationTypes = {
                $in: centerFilter.donationTypes
            }
        }

        return this.find(query)
            .populate('donationTypes', 'name description')
            .exec();
    } catch (error) {
        throw new Error(error.message);
    }
}

// virtual attributes
centerSchema.virtual('centerTypeDescription').get(function () {
    return centerTypes.descriptions.spanish[this.centerType];
});
// If without it, when "console.log('JSON:', JSON.stringify(center));", we could not see donationType
centerSchema.set('toJSON', {
    getters: true,
    virtual: true
});

module.exports = mongoose.model('Center', centerSchema);