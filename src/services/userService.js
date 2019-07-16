const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// environment variables
const JWT_SECRET = process.env.JWT_SECRET || '';

const userService = {};

const User = require('../models/userModel');
const roles = require('../models/enums/roles');

userService.login = async (email, password) => {
    const userDb = await userService.getUserByEmail(email);
    if (!userDb) {
        throw new Error(`Invalid credentials`);
    }
    if (!bcrypt.compare(password, userDb.password)) {
        throw new Error(`Invalid credentials`);
    }
    userDb.password = ':)';
    const token = userService.generateAuthToken(userDb);

    return {
        token,
        user: userDb
    }
}

userService.createNewUser = async (user) => {
    user.password = bcrypt.hashSync(user.password, 12);
    const newUser = await User.createNewUser(user);
    // don't send the password back
    newUser.password = ':)';
    return newUser;
};

userService.generateAuthToken = (user) => {
    try {
        user.password = ':)'; // don't send the password back in the token
        let token = jwt.sign({
            user
        }, JWT_SECRET, {
            expiresIn: 14400
        }).toString();
        return token;
    } catch (error) {
        console.warn(`There was an error trying to generate an auth token. Error: ${error}`);
        throw error;
    }

}

userService.getUserByEmail = async (email) => {
    return User.getUserByEmail(email);
};

userService.getUserById = async (userId) => {
    return User.getUserById(userId);
};

userService.isAdmin = (user) => {
    return user.role === roles.enums.Admin;
}

userService.isAdminOrSuperAdmin = (user) => {
    return user.role === roles.enums.Admin || user.role === roles.enums.SuperAdmin;
}

userService.isSuperAdmin = (user) => {
    return user.role === roles.enums.SuperAdmin;
}

module.exports = userService;