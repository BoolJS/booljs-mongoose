'use strict';

const ENV = process.env.NODE_ENV || 'development';
const mongoose = require('mongoose');
const { format } = require('url');

module.exports = (configuration = {}) => new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;

    const {
        protocol = 'mongodb',
        host = 'localhost',
        database = 'test',
        port = 27017,
        user = '',
        password = '',
        ...extraParameters
    } = configuration[ENV];

    let hostname = typeof host === 'string'
        ? host
        : Array.isArray(host)
            ? host.join(`:${port},`)
            : 'localhost';

    let auth = `${user}:${password}`;

    const connection = mongoose.createConnection(format({
        slashes: true,
        auth,
        protocol,
        hostname,
        ...Array.isArray(host) || protocol === 'mongodb+srv'
            ? {} : { port },
        pathname: database
    }), { ...extraParameters, useNewUrlParser: true });

    connection.on('connected', () => resolve(connection));
    connection.on('error', error => reject(error));
});
