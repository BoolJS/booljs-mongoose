'use strict';

const API = require('booljs-api');
const lib = require('./lib');

module.exports = class BoolJSMongoose extends API.DatabaseLoader {
    constructor(){
        super('booljs-mongoose');
    }

    openDatabase(dbconfig) {
        return lib.openDatabase(dbconfig);
    }

    fetchModels(instance, models, connection){
        return lib.fetchModels(instance, models, connection);
    }

    modelTemplate(){
        return lib.modelTemplate();
    }

    modelConfiguration(){
        return lib.modelConfiguration();
    }
};
