const centerTypes = {};

centerTypes.enums = Object.freeze({
    AnimalRefuge: 'AnimalRefuge',
    Home: 'Home',
    Organization: 'Organization',
    ReligiousCenter: 'ReligiousCenter',
    School: 'School',
    Olla: 'Olla'
});

centerTypes.descriptions = {
    spanish: {
        'AnimalRefuge': 'Refugio animal',
        'Home': 'Hogar',
        'Organization': 'Organización',
        'ReligiousCenter': 'Centro religioso',
        'School': 'Centro educativo',
        'Olla': 'Olla popular'
    }
};

module.exports = centerTypes;
