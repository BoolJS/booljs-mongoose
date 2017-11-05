'use strict';

const { join } = require('path');
const { readFile } = require('fs');

module.exports = filepath => new Promise((resolve, reject) => {
    readFile(join(require.resolve('..'), '..', filepath), (error, data) => {
        if (error) {
            return reject(error);
        }

        return resolve(data.toString());
    });
});
