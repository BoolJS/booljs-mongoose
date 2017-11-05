'use strict';

const ENV = process.env.NODE_ENV || 'development';
const mongoose = require('mongoose');
const { format } = require('url');

module.exports = (configuration = {}) => new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;

    let { host, database, port, ...extraParameters } = configuration[ENV];

    var connection = mongoose.createConnection(format({
        protocol: 'mongodb',
        slashes: true,
        hostname: host || 'localhost',
        pathname: database || 'test',
        port: port || 27017
    }), extraParameters);

    connection.on('connected', () => resolve(connection));
    connection.on('error', error => reject(error));
});
