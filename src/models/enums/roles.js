const roles = {};

roles.enums = Object.freeze({
    Admin: 'Admin',
    Regular: 'Regular',
    SuperAdmin: 'SuperAdmin'
});

roles.descriptions = Object.freeze({
    english: {
        'Admin': 'Administrator',
        'Regular': 'Regular',
        'SuperAdmin': 'Super administrator'
    },
    spanish: {
        'Admin': 'Administrador',
        'Regular': 'Regular',
        'SuperAdmin': 'Super administrador'
    }
});

module.exports = roles;