'use strict';

const { DatabaseLoader } = require('@booljs/api');
const lib = require('./lib');

module.exports = class BoolJSMongoose extends DatabaseLoader {
    constructor ({ connectionSettingsStoreName = 'mongoose' } = {}) {
        super('booljs.mongoose', connectionSettingsStoreName);
    }

    openDatabase (dbconfig) {
        return lib.openDatabase(dbconfig);
    }

    modelClass () {
        return lib.modelClass;
    }

    fetchModels (instance, name, Component, connection) {
        return lib.fetchModels(instance, name, Component, connection);
    }

    modelTemplate () {
        return lib.modelTemplate();
    }

    modelConfiguration () {
        return lib.modelConfiguration();
    }
};
