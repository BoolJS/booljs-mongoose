'use strict';

var API = require('booljs-api');

module.exports = new API.DatabaseLoader(
    'booljs-mongoose', // Name
    require('./lib') // Functions
);
