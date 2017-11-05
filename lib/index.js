'use strict';

module.exports = {
    openDatabase: require('./open'),
    fetchModels: require('./fetch'),
    modelTemplate: require('./model'),
    modelClass: require('../model'),
    modelConfiguration: require('./configuration')
};
