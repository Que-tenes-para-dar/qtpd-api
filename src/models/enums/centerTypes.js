const centerTypes = {};

centerTypes.enums = Object.freeze({
    AnimalRefuge: 'AnimalRefuge',
    Home: 'Home',
    Organization: 'Organization',
    ReligiousCenter: 'ReligiousCenter',
    School: 'School',
});

centerTypes.descriptions = {
    spanish: {
        'AnimalRefugee': 'Refugio animal',
        'Home': 'Hogar',
        'Organization': 'Organización',
        'ReligiousCenter': 'Centro religioso',
        'School': 'Centro educativo',
    }
};

module.exports = centerTypes;
