const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const roles = require('./enums/roles');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es requerido']
    },
    name: {
        firstName: {
            type: String,
            required: [true, 'El nombre es requerido']
        },
        lastName: {
            type: String,
            required: [true, 'El apellido es requerido']
        },
    },
    password: {
        type: String
    },
    role: {
        type: String,
        required: [true, 'El rol es requerido'],
        enum: Object.values(roles.enums)
    },
    username: {
        type: String,
        required: [true, 'El nombre de usuario es requerido']
    }
}, {
    collection: 'users'
});

userSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
});

// =========================================================================
// Static methods
// =========================================================================
userSchema.statics.createNewUser = async (user) => {
    return user.save();
};
userSchema.statics.getUserByEmail = async (email) => {
    return User.findOne({
        'email': email
    });
}
userSchema.statics.getUserById = async (userId) => {
    return User.findById(userId);
};

// =========================================================================
// Set virtual attributes
// =========================================================================
userSchema.virtual('fullName').get(function () {
    return this.name.firstName + ' ' + this.name.lastName;
});

userSchema.set('toJSON', {
    getters: true,
    virtual: true
});

const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);